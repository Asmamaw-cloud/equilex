// import { Payment } from "@/server/payment-management/Payment";
// import { NextResponse } from "next/server";

// export async function POST(req: Request, res: Response) {
//   try {
//     const { full_name, account, amount, bank_code } = await req.json();
//     console.log("request json: ", req.json());
//     if (!full_name || !account || !amount || !bank_code) {
//       throw new Error("Please provide the all the necessary inputs");
//     }
//     const newWithdrawRequest = await Payment.requestWithdrawal({
//       full_name,
//       account,
//       amount,
//       bank_code,
//     });
//     console.log("New withdrawal request: ", newWithdrawRequest);
//     return NextResponse.json(
//       { message: "New withdrawal request created!", newWithdrawRequest },
//       { status: 201 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(`${error.message}`);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(
//       { error: "Couldn't request withdrawal" },
//       { status: 500 }
//     );
//   }
// }





import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("🔁 /api/transaction/withdraw route file loaded");
    const body = await req.json();
    console.log("request json: ", body);

    const { full_name, account, amount, bank_code } = body;

    if (!full_name || !account || !amount || !bank_code) {
      return NextResponse.json(
        { error: "Please provide all the necessary inputs" },
        { status: 400 }
      );
    }

    const newWithdrawRequest = await Payment.requestWithdrawal({
      full_name,
      account,
      amount,
      bank_code,
    });

    console.log("New withdrawal request: ", newWithdrawRequest);

    return NextResponse.json(
      { message: "New withdrawal request created!", newWithdrawRequest },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Withdrawal error with :", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Couldn't request withdrawal" },
      { status: 500 }
    );
  }
}
