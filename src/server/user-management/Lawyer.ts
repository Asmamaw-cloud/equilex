import { Court, Language, Specialty } from "@prisma/client";
import { Account } from "./Account";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { isAdmin, isLawyer } from "../checkRole";

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
  ) {
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

  static async getVerified() {
    const lawyers = await db.lawyer.findMany({
      select: {
        created_at: true,
        cv: true,
        email: true,
        phone_number: true,
        photo: true,
        full_name: true,
        description: true,
        id: true,
        identification_card: true,
        isVerified: true,
        qualification: true,
        resume: true,
        courts: true,
        languages: true,
        specialties: true,
        updatedAt: true,
        balance: true,
        ratings: {
          select: {
            rate: true,
          },
        },
      },
      where: {
        isVerified: "VERIFIED",
      },
    });
    return lawyers;
  }

  static async getUnverfiedLawyers() {
    await isAdmin();

    const lawyers = await db.lawyer.findMany({
      select: {
        created_at: true,
        cv: true,
        email: true,
        phone_number: true,
        photo: true,
        full_name: true,
        description: true,
        id: true,
        identification_card: true,
        isVerified: true,
        qualification: true,
        resume: true,
        courts: true,
        languages: true,
        specialties: true,
        updatedAt: true,
        balance: true,
      },
      where: {
        isVerified: "PENDING",
      },
    });
    return lawyers;
  }

  static async verify(id: number) {
    await isAdmin();
    const lawyer = await db.lawyer.update({
      where: {
        id,
      },
      data: {
        isVerified: "VERIFIED",
      },
    });
    return lawyer;
  }

  static async reject(id: number) {
    await isAdmin();
    const lawyer = await db.lawyer.update({
      where: {
        id,
      },
      data: {
        isVerified: "REJECTED",
      },
    });
    return lawyer;
  }

  static async dashboard() {
    const lawyerSession = await isLawyer();
    const lawyer = await db.lawyer.findUnique({
      where: {
        //@ts-ignore
        id: lawyerSession.user.image?.indexOf,
      },
    });
    const totalCases = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
      },
    });
    const completedCase = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
        status: "FINISHED",
      },
    });
    const inProgressCases = await db.case.count({
      where: {
        lawyer_id: lawyer?.id,
        status: "ACCEPTED",
      },
    });
    return {
      inProgressCases,
      completedCase,
      totalCases,
    };
  }
}
