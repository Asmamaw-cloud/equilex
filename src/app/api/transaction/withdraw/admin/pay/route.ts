import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.withdrawRequestId) {
      throw new Error("Please provide the necessary information.");
    }
    const lawyerPaid = await Payment.pay(userInput.withdrawRequestId);
    return NextResponse.json(
      { message: "Lawyer paid", lawyerPaid },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't pay laweyr" }, { status: 500 });
  }
}
