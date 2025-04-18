import { Client } from "@/server/user-management/Client";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const userInput = await req.json();
    if (!userInput.email || !userInput.password) {
      throw new Error("Please provide all the necessary information.");
    }

    const newUser = await Client.add(
      userInput.email,
      userInput.password,
      userInput.full_name,
      userInput.phone_number
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
    const clients = await Client.getAll();
    return NextResponse.json({ id: "GET", clients });
  } catch (error) {
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

export async function PUT(req: Request) {
  try {
    const userInput = await req.json();
    console.log("User Input data: ", userInput)

    const {  full_name, phone_number, photo } = userInput;
    console.log( "FullName: ", full_name, "phone_number: ", phone_number, "photo: ", photo)

    const clientUpdated = await Client.update(
      full_name,
      phone_number,
      photo
    );
    console.log("User Input Client updated: ", clientUpdated)

    return NextResponse.json({ clientUpdated });
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
