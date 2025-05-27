import { db } from "@/lib/db";
import { isAdmin, isClient, isLawyer } from "../checkRole";
import axios from "axios";

export class Payment {
  static readonly CHAPA_AUTH_KEY: string = process.env.NEXT_PUBLIC_CHAPA_AUTH_KEY!;
  static readonly CALLBACK_URL: string = process.env.CHAPA_CALLBACK_URL!;
  static readonly REDIRECT_URL: string = process.env.CHAPA_REDIRECT_URL!;
  static readonly CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;


  static async initiate(
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    case_id: number
  ) {
    const client = await isClient();
    const header = {
      headers: {
        Authorization: `Bearer ${this.CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const TEXT_REF =
      "equilex" +
      //@ts-ignore
      client.user.image.id +
      Date.now();

    const currentCase = await db.case.findUnique({
      where: {
        id: case_id,
      },
    });

    if (!currentCase) {
      throw new Error("Case doesn't exist");
    }

    const body = {
      amount: currentCase.price, 
      currency: "ETB",
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      tx_ref: TEXT_REF,
      callback_url: this.CALLBACK_URL + TEXT_REF,
      return_url: this.REDIRECT_URL,
    };

    const response = await axios.post<any>(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      header
    );

    await db.case.update({
      where: {
        id: case_id,
      },
      data: {
        payment_id: TEXT_REF,
      },
    });
    console.log("checkout url response from chapa: ", response.data);
    return response.data.data.checkout_url;
  }

  static async verify(transactionId: string) {
    console.log("Transaction ID: ", transactionId);

    const config = {
      headers: {
        Authorization: `Bearer ${this.CHAPA_AUTH_KEY}`,
      },
    };

    const checkVerify = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + transactionId,
      config
    );

    console.log("Verification response: ", checkVerify.data);

    const acceptedCase = await db.case.update({
      where: {
        payment_id: transactionId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    await db.transaction.create({
      data: {
        payment_id: transactionId,
        references: checkVerify.data.data.reference,
        case_id: acceptedCase.id,
        paid_at: new Date(),
      },
    });
    return acceptedCase;
  }


  static async requestWithdrawal({
  full_name,
  account,
  amount,
  bank_code,
}: {
  full_name: string;
  account: string;
  amount: number;
  bank_code: string;
}) {
  const lawyerSession = await isLawyer();

  const lawyer = await db.lawyer.findUnique({
    where: {
      //@ts-ignore
      id: lawyerSession.user.image.id,
    },
  });

  if (!lawyer) {
    throw new Error("Lawyer doesn't exist");
  }

  if (lawyer.balance < amount) {
    throw new Error("Insufficient balance.");
  }

  const res = await axios.post(
    "https://api.chapa.co/v1/transfers",
    {
      account_name: full_name,
      account_number: account,
      amount,
      currency: "ETB",
      bank_code,
      reference: `withdraw-${Date.now()}`,
    },
    {
      headers: {
        Authorization: `Bearer ${this.CHAPA_SECRET}`,
        "Content-Type": "application/json",
      },
    }
  );

  const chapaResponse = res.data;
  console.log("Withdrawal response from Chapa:", chapaResponse);

  if (chapaResponse.status !== "success") {
    throw new Error(`Chapa API error: ${chapaResponse.message}`);
  }

  await db.lawyer.update({
    where: { id: lawyer.id },
    data: {
      balance: { decrement: amount },
    },
  });

  const newWithdrawRequest = await db.withdrawRequest.create({
    data: {
      amount,
      lawyer_id: lawyer.id,
      status: "TRANSFERRED",
    },
  });

  return {
    chapaResponse,
    newWithdrawRequest,
  };
}






  // static async requestWithdrawal({
   
  static async withdrawalRequestHistory() {
    await isAdmin();
    const withdrawRequestHistory = await db.withdrawRequest.findMany();
    return withdrawRequestHistory;
  }

  static async pay(withdrawRequestId: number) {
    await isAdmin();
    const withdrawRequest = await db.withdrawRequest.findUnique({
      where: {
        id: withdrawRequestId,
        status: "PENDING ",
      },
    });
    await db.lawyer.update({
      where: {
        id: withdrawRequest?.lawyer_id,
      },
      data: {
        balance: {
          decrement: withdrawRequest?.amount,
        },
      },
    });
    const acceptedWithdrawRequest = await db.withdrawRequest.update({
      where: {
        id: withdrawRequest?.id,
      },
      data: {
        status: "TRANSFERRED ",
      },
    });
    return acceptedWithdrawRequest;
  }

  static async getTransactionHistory() {
    await isAdmin();
    const transactionHistory = await db.transaction.findMany({
      include: {
        case: true,
      },
    });
    return transactionHistory;
  }
}
