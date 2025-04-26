import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";




export async function GET(req: Request) {
    try {
      const upcomingTrials = await Case.getUpcomingTrials();
      return NextResponse.json({ upcomingTrials });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { error: "Couldn't get upcoming trials" },
        { status: 500 }
      );
    }
  }