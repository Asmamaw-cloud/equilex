import { Lawyer } from "@/server/user-management/Lawyer";
import { Language } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
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




export async function GET(req: Request) {
  try {
      const lawyers = await Lawyer.getUnverifiedLawyers()
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

export async function PUT(req: Request, res: Response) {
  try {
    const userInput = await req.json();

    // Automatically filter valid enum values
    const validLanguages = (userInput.languages || []).filter((lang: string) =>
      Object.values(Language).includes(lang as Language)
    );

    const lawyerUpdated = await Lawyer.update(
      userInput.full_name,
      userInput.phone_number,
      userInput.photo,
      userInput.description,
      validLanguages,
      userInput.resume
    );
    return NextResponse.json({ lawyerUpdated });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't update client" },
      { status: 500 }
    );
  }
}
