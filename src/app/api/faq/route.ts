import { Faq } from "@/server/user-management/Faq";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const faq = await req.json();
    console.log("here are the faqs: ", faq);

    const newFaq = await Faq.add(faq);
    return NextResponse.json({ message: "New Faq created" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't add faq" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const faqs = await Faq.getFaq()
    return NextResponse.json({ id: "GET", faqs });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Couldn't get faqs" }, { status: 500 });
  }
}