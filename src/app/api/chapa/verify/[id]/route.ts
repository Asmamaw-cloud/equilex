import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const acceptedCase = await Payment.verify(id);

    return NextResponse.json(
      { verified: true, acceptedCase: acceptedCase.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't reject case" },
      { status: 500 }
    );
  }
}
