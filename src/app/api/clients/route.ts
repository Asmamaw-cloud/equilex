import { Client } from "@/server/user-management/Client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userInput = await req.json();
    if (!userInput.email || !userInput.full_name || !userInput.phone_number) {
      throw new Error("Please provide all the necessary information: email, full_name, phone_number.");
    }

    const newUser = await Client.add(
      userInput.email,
      userInput.full_name,
      userInput.phone_number
    );
    return NextResponse.json(
      { message: "New client account created", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Couldn't create client account" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const clients = await Client.getAll();
    return NextResponse.json({ clients }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get clients" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const userInput = await req.json();
    if (!userInput.id || !userInput.email || !userInput.full_name || !userInput.phone_number) {
      throw new Error("Please provide all the necessary information: id, email, full_name, phone_number.");
    }

    const clientUpdated = await Client.update(
       userInput.email,
      userInput.full_name,
      userInput.phone_number
    );

    return NextResponse.json({ clientUpdated }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Couldn't update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userInput = await req.json();
    if (!userInput.id) {
      throw new Error("Please provide the client ID.");
    }

    await Client.delete(userInput.id);
    return NextResponse.json({ message: "Client deleted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Couldn't delete client" },
      { status: 500 }
    );
  }
}