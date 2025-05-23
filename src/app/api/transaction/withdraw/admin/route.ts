import { Payment } from "@/server/payment-management/Payment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const withdrawalRequests = await Payment.withdrawalRequestHistory();
    return NextResponse.json({ withdrawalRequests }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get withdrawal requests" },
      { status: 500 }
    );
  }
}
