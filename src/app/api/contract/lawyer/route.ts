import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lawyerId = url.searchParams.get('lawyerId');
    
    if (!lawyerId) {
      return NextResponse.json({ error: "Lawyer ID is required" }, { status: 400 });
    }

    const contracts = await Contract.getLawyerContracts(Number(lawyerId));
    return NextResponse.json({ contracts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}