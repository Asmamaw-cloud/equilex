import { db } from "@/lib/db";
import { Account } from "./Account";
import bcrypt from "bcryptjs";
import { isAdmin, isClient } from "../checkRole";

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

  static async getById() {
    const clientSession = await isClient();
    const client = await db.client.findUnique({
      where: {
        //@ts-ignore
        id: clientSession.user.image.id,
      },
    });
    return client;
  }

  static async getAll() {
    await isAdmin();

    const clients = await db.client.findMany({
      select: {
        created_at: true,
        email: true,
        id: true,
        updatedAt: true,
        full_name: true,
        phone_number: true,
      },
    });
    return clients;
  }

  static async update(
    full_name: string | undefined,
    phone_number: string | undefined,
    photo: string | undefined
  ) {
    const client = await isClient();
    const clientUpdated = await db.client.update({
      data: {
        ...(full_name && { full_name }),
        ...(phone_number && { phone_number }),
        ...(photo && { photo }),
      },
      where: {
        //@ts-ignore
        id: client.user.image.id,
      },
    });
    return clientUpdated;
  }
}
