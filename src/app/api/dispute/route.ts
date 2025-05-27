import { Dispute } from "@/server/dispute-resolution/Dispute";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: Response) {
    try {
      const userInput = await req.json();
      console.log("Received user input:", userInput);
      if (
        !userInput.client_id ||
        !userInput.lawyer_id ||
        !userInput.content ||
        !userInput.documents ||
        !userInput.creator_email
      ) {
        throw new Error("Please provide all the necessary information.");
      }
      const newDispute = await Dispute.create(
        userInput.client_id,
        userInput.lawyer_id,
        userInput.creator_email,
        userInput.content,
        userInput.documents,
        userInput.case_id
      );
      return NextResponse.json(
        { message: "New dispute created", faqId: newDispute.id },
        { status: 201 }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { error: "Couldn't create dispute" },
        { status: 500 }
      );
    }
  }

  export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const disputes = await Dispute.getAll();
      console.log("Disputes fetched successfully from GET: ", disputes);
      return NextResponse.json({ disputes });
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { error: "Couldn't get disputes" },
        { status: 500 }
      );
    }
  }