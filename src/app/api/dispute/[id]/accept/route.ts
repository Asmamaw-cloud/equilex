import { Dispute } from "@/server/dispute-resolution/Dispute";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    await Dispute.accept(Number(id));
    return NextResponse.json(
      { message: "Dispute status updated to accepted." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't update dispute status" },
      { status: 500 }
    );
  }
}