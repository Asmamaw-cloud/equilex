import { Client } from "@/server/user-management/Client";
import { NextResponse } from "next/server";




export async function GET(preq:Request) {
    try {
        const client = await Client.getById()
        return NextResponse.json({client}, {status:200})
    } catch (error) {
        if (error instanceof Error) {
          console.log(`${error.message}`);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Couldn't get client" }, { status: 500 });
      }
}