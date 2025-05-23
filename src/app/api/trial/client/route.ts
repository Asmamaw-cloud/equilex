import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const trials = await Case.getTodayTrialsForClient();
            console.log("Here are client trials: ",trials);

        return NextResponse.json({trials})
    } catch (error) {
        if (error instanceof Error) {
            console.log(`${error.message}`);
            return NextResponse.json({ error: error.message }, { status: 500 });
          }
          return NextResponse.json(
            { error: "Couldn't get today trials" },
            { status: 500 }
          );
    }
}