import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const id = Number(params.id);
    const caseById = await db.case.findUnique({
      where: {
        id,
      },
      include: {
        lawyer: {
          select: {
            full_name: true,
          },
        },
        client: {
          select: {
            full_name: true,
          },
        },
      },
    });
    return NextResponse.json({ caseById }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get client cases" },
      { status: 500 }
    );
  }
}
