import { Lawyer } from "@/server/user-management/Lawyer";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    console.log("Here is the recieved user input json: ", userInput)
    if (
      !userInput.email ||
      !userInput.password ||
      !userInput.id ||
      !userInput.qualification
    ) {
      throw new Error("Please provide all the necessary information.");
    }

    const newUser = await Lawyer.add(
      userInput.email,
      userInput.password,
      userInput.id,
      userInput.qualification,
      userInput.languages,
      userInput.specialties,
      userInput.courts,
      userInput.photo,
      userInput.description,
      userInput.full_name,
      userInput.phone_number,
      userInput.cv,
      userInput.resume
    );
    return NextResponse.json(
      { message: "New user account created", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't create user account" },
      { status: 500 }
    );
  }
}




export async function GET(req: Request, res: Response) {
  try {

      const lawyers = await Lawyer.getUnverfiedLawyers()
      return NextResponse.json({ id: "GET", lawyers })

  } catch(error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get lawyers" },
      { status: 500 }
    );
  }
}