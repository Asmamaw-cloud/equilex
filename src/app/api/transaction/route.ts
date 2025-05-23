import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const transactionHistory = await Payment.getTransactionHistory();
    console.log("transactionHistory from the db: ", transactionHistory);
    return NextResponse.json({ transactionHistory });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get transaction history" },
      { status: 500 }
    );
  }
}
