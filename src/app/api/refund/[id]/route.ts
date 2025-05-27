import { db } from "@/lib/db"; // adjust to your actual path
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  console.log("here is the params:", params);
  const caseId =  (params.id);
  console.log("Fetching reference for case ID:", caseId);

  if (!caseId) {
    return new Response(JSON.stringify({ error: "Invalid case ID" }), {
      status: 400,
    });
  }

  try {
    const foundCase = await db.transaction.findUnique({
      where: { id: Number(caseId) },
      select: {
        references: true,
      },
    });

    if (!foundCase) {
      return new Response(JSON.stringify({ error: "Case not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ reference: foundCase.references }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching reference:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
