
import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("request json: ", body);

    const { reference } = body;
    const reason = "refund to the client";


    const refund = await Payment.refund({
      reference,
      reason,
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
