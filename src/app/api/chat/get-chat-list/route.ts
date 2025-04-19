import { db } from "@/lib/db";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    let session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Not authenticated");
    }
    const chatList =
    //@ts-ignore
      session.user.image.type == "client"
        ? await db.message
            .findMany({
              where: { clientId: session.user.image.id },
              orderBy: { createdAt: "desc" },
              distinct: "lawyerId",
              select: {
                lawyer: {
                  select: {
                    id: true,
                    email: true,
                    photo: true,
                    full_name: true,
                  },
                },
                message: true,
              },
            })
            .then((results) =>
              results.map((c) => ({
                otherUser: c.lawyer,
                message: c.message,
              }))
            )
        : await db.message
            .findMany({
              where: { lawyerId: session.user.image.id },
              orderBy: { createdAt: "desc" },
              distinct: "clientId",
              select: {
                client: {
                  select: {
                    id: true,
                    email: true,
                    photo: true,
                    full_name: true,
                  },
                },
                message: true,
              },
            })
            .then((results) =>
              results.map((c) => ({
                otherUser: c.client,
                message: c.message,
              }))
            );

    return NextResponse.json({ chatList });
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
