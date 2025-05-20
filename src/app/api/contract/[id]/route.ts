// import { Contract } from "@/server/contract-management/Contract";
// import { NextResponse } from "next/server";

// // GET: Get single contract
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const contract = await Contract.getContractById(Number(params.id));
//     return NextResponse.json({ contract }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Contract not found" }, { status: 404 });
//   }
// }


// src/app/api/contract/[id]/route.ts
import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const contract = await Contract.getContractById(Number(params.id));
    return NextResponse.json({ contract }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Contract not found" }, { status: 404 });
  }
}