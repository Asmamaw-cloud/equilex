// src/app/api/contract/[id]/sign/route.ts
import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const signedContract = await Contract.signContract(Number(params.id));
    return NextResponse.json({ contract: signedContract }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign contract" }, { status: 500 });
  }
}