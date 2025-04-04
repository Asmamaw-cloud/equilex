import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    throw new Error("Provide the lawyer id");
  }

  const user = await db.lawyer.findUnique({
    where: {
      id: parseInt(params.id),
    },
    select: {
      created_at: true,
      cv: true,
      email: true,
      phone_number: true,
      photo: true,
      full_name: true,
      description: true,
      id: true,
      identification_card: true,
      isVerified: true,
      qualification: true,
      resume: true,
      courts: true,
      languages: true,
      specialties: true,
      updatedAt: true,
      balance: true,
    },
  });
  if (user != null) {
    return NextResponse.json({ user }, { status: 200 });
  } else return NextResponse.json({ message: "error on fetching user" });
}
