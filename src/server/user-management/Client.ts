import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcrypt";


export class Client extends Account {
  static async add(
    email: string,
    password: string,
    full_name: string,
    phone_number: string
  ) {
    const emailUsed =
      (await db.client.findFirst({ where: { email } })) ||
      (await db.lawyer.findFirst({ where: { email } }));
    if (emailUsed) {
      throw new Error("Email already used");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.client.create({
      data: {
        full_name,
        phone_number,
        email: email,
        password: hashedPassword,
      },
    });
    return newUser;
  }
}
