import { Court, Language, Specialty } from "@prisma/client";
import { Account } from "./Account";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export class Lawyer extends Account {
  static async add(
    email: string,
    password: string,
    identification_card: string,
    qualification: string,
    languages: Language[],
    specialties: Specialty[],
    courts: Court[],
    photo: string,
    description: string,
    full_name: string,
    phone_number: string,
    cv: string | undefined,
    resume: string | undefined
  )
  {
    const emailUsed =
      (await db.client.findFirst({ where: { email } })) ||
      (await db.lawyer.findFirst({ where: { email } }));
    if (emailUsed) {
      throw new Error("Email already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.lawyer.create({
      data: {
        phone_number,
        full_name,
        email: email,
        password: hashedPassword,
        identification_card: identification_card,
        qualification: qualification,
        languages: languages,
        specialties: specialties,
        courts: courts,
        photo: photo,
        description: description,
        ...(cv && { cv: cv }),
        ...(resume && { resume: resume }),
      },
    });
    return newUser;
  }
}
