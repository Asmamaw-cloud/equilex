// import { Contract } from "@/server/contract-management/Contract";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = params.id;
//     const contracts = await Contract.getLawyerContracts(Number(id));
//     return NextResponse.json({ contracts }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json(
//       { error: "Couldn't get contracts" },
//       { status: 500 }
//     );
//   }
// }





import { Contract } from "@/server/contract-management/Contract";
import { NextResponse } from "next/server";

// GET: List all contracts
export async function GET() {
  try {
    const contracts = await Contract.getAllContracts();
    return NextResponse.json({ contracts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}

// POST: Create new contract
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const contract = await Contract.createContract(data);
    return NextResponse.json({ contract }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 });
  }
}