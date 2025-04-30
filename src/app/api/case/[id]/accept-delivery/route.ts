import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const finishedCase = await Case.acceptDelivery(Number(id));

    return NextResponse.json({ finishedCase }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't accept case" },
      { status: 500 }
    );
  }
}
