import { Client } from "@/server/user-management/Client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Client ID is required.");
    }

    const client = await Client.getById(id);
    if (!client) {
      throw new Error("Client not found.");
    }

    return NextResponse.json({ client }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Couldn't get client" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Client ID is required.");
    }

    await Client.delete(id);
    return NextResponse.json({ message: "Client deleted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Couldn't delete client" }, { status: 500 });
  }
}