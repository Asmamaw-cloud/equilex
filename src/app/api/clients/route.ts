// api/clients/route.ts
import { Client } from "@/server/user-management/Client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

export async function GET(req: Request) {
  try {
    const clients = await Client.getAll();
    return NextResponse.json({ id: "GET", clients });
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
    const { full_name, phone_number, photo } = userInput;

    const clientUpdated = await Client.update(
      full_name,
      phone_number,
      photo
    );

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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      throw new Error("Client ID is required");
    }

    await Client.delete(id);
    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't delete client" },
      { status: 500 }
    );
  }
}