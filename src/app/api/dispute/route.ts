import { Dispute } from "@/server/dispute-resolution/Dispute";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    try {
      const userInput = await req.json();
      if (
        !userInput.client_id ||
        !userInput.lawyer_id ||
        !userInput.content ||
        !userInput.creator_email
      ) {
        throw new Error("Please provide all the necessary information.");
      }
      const newDispute = await Dispute.create(
        userInput.client_id,
        userInput.lawyer_id,
        userInput.creator_email,
        userInput.content
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

  export async function GET(req: Request, res: Response) {
    try {
      const disputes = await Dispute.getAll();
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