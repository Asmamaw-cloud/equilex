import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const updatedContract = await Contract.updateContract(Number(params.id), data);
    return NextResponse.json({ contract: updatedContract }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contract" }, { status: 500 });
  }
}