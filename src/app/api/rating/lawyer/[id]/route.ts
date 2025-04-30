

import { Rating } from "@/server/user-management/Rating";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const ratings = await Rating.lawyerList(Number(id));
    return NextResponse.json({ ratings }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get ratings" },
      { status: 500 }
    );
  }
}