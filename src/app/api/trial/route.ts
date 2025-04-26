import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        const userInput = await req.json()
        if (!userInput.trial_date || !userInput.case_id || !userInput.location) {
            throw new Error("Please provide all the necessary information.");
          }

        const newTrial = await Case.addTrialDates(
            userInput.trial_date,
      userInput.case_id,
      userInput.description,
      userInput.location
          )
          return NextResponse.json(
            { message: "New trial added", newTrial },
            { status: 201 }
          );
    } catch (error) {
        if (error instanceof Error) {
            console.log(`${error.message}`);
            return NextResponse.json({ error: error.message }, { status: 500 });
          }
          return NextResponse.json({ error: "Couldn't add trial" }, { status: 500 });
    }
}