import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contracts = await Contract.getAllContracts();
    return NextResponse.json({ contracts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const contract = await Contract.createContract(data);
    return NextResponse.json({ contract }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 });
  }
}