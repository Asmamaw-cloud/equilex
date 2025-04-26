import { Lawyer } from "@/server/user-management/Lawyer";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const analytics = await Lawyer.dashboard();
    return NextResponse.json({ analytics });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get analytics." },
      { status: 500 }
    );
  }
}
