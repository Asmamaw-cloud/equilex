'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import mokeData from "./FAQMokeData";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFaq } from "@/app/admin/api/faq";
import Link from "next/link";

const Faq = () => {

  const {data: faq, isLoading, error} = useQuery({
    queryKey: ["faq"],
    queryFn: () => getFaq()
  })
  console.log("The response from the faq database: ", faq)

  return (
    <div id="faq" className="p-8 flex flex-col">
      <div className=" mx-auto py-8 ">
        <h1 className=" text-4xl font-bold text-black">
          Frequently Asked Questions
        </h1>
        <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Find answers to common questions about EQUILEX and its services.
          </p>
      </div>
      <Accordion
        type="multiple"
        className=" grid  md:grid-cols-1 lg:grid-cols-2  grid-cols-1 "
      >
        {faq?.map((data) => {
          return (
            <AccordionItem
              value={data.answer}
              key={data.id}
              className=" p-4 mx-4 shadow-md transform transition duration-500 hover:scale-105 h-auto px-3 "
            >
              <AccordionTrigger> {data.question} </AccordionTrigger>
              <AccordionContent> {data.answer} </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="mt-12 rounded-xl border bg-background p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B3B99]/10 text-[#7B3B99]">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  If you couldn't find the answer to your question, feel free to contact our support team.
                </p>
                <Link
                  href="mailto:asmamawkassahun2016@gmail.com"
                  className="inline-flex items-centerter text-[#7B3B99] hover:underline font-medium"
                >
                  Contact Support
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
      {/* <div className="grid w-full gap-2 px-4 my-4">
        <h3 className=" text-xl font-semibold text-black my-4 mx-auto">
          Ask questions, gain clarity, and empower your legal journey with us
          ...
        </h3>
        <Textarea placeholder="Type your question here." />
        <Button className="bg-[#7B3B99]">Ask Question</Button>
      </div> */}
    </div>
  );
};

export default Faq;
