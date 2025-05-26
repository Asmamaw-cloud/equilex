import { signIn, signOut } from "next-auth/react";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export class Account {
  static async login(email: string, password: string) {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!res?.ok) {
      throw new Error("Invalid credentials");
    }
    return;
  }

  static async changePassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Try to find user in client table
    const client = await db.client.findUnique({ where: { email } });
    if (client) {
      await db.client.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return { message: "Client password updated." };
    }

    // Try to find user in lawyer table
    const lawyer = await db.lawyer.findUnique({ where: { email } });
    if (lawyer) {
      await db.lawyer.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return { message: "Lawyer password updated." };
    }

    // Try to find user in admin table
    const admin = await db.admin.findUnique({ where: { email } });
    if (admin) {
      await db.admin.update({
        where: { email },
        data: { password: hashedPassword },
      });
      return { message: "Admin password updated." };
    }

    throw new Error("No user found with this email.");
  }

  static async logout() {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    return;
  }
}
