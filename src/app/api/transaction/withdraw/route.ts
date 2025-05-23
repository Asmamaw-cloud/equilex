import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.amount) {
      throw new Error("Please provide the balance");
    }
    const newWithdrawRequest = await Payment.requestWithdrawal(
      userInput.amount
    );
    return NextResponse.json(
      { message: "New withdrawal request created!", newWithdrawRequest },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't request withdrawal" },
      { status: 500 }
    );
  }
}