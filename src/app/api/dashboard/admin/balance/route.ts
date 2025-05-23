import { db } from "@/lib/db";
import { isAdmin } from "@/server/checkRole";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    await isAdmin();
    const analytics = await db.case.aggregate({
      _sum: {
        price: true,
      },
      where: {
        status: "ACCEPTED",
      },
    });

    //@ts-ignore
    const earning = (analytics._sum.price * 20) / 100;
    return NextResponse.json({ earning });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Couldn't get earning." },
      { status: 500 }
    );
  }
}
