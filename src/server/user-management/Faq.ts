import { db } from "@/lib/db";
import { Account } from "./Account";

export class Faq extends Account { 
    static async add(data: { question: string; answer: string }) {
        const { question, answer } = data;
        const newFaq = await db.faq.create({
          data: {
            question,
            answer
          },
        });
        return newFaq;  
      }

      static async getFaq() {
        const faqs = await db.faq.findMany()
        console.log("Here are faqs: ", faqs )

        return faqs
      }
      
}