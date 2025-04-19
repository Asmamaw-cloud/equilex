import { Case } from "@/server/case-management/Case";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  try {
    const userInput = await request.json();
    if (
      !userInput.client_id ||
      !userInput.lawyer_id ||
      !userInput.title ||
      !userInput.description ||
      !userInput.price
    ) {
      throw new Error("Please provide all the necessary information.");
    }

    const newCase = await Case.create(
      userInput.client_id,
      userInput.lawyer_id,
      userInput.title,
      userInput.description,
      userInput.price
    );

    return NextResponse.json({message: "New case created", newCase}, {status: 200})
  } catch (error) {
    if (error instanceof Error) {
        console.log(`${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { error: "Couldn't create case" },
        { status: 500 }
      );
  }
}
