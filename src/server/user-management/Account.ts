import { signIn, signOut } from "next-auth/react";

export class Account {
  static async login(email: string, password: string) {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("here is the response form signIn: ",res)
    if (!res?.ok) {
      throw new Error("Invalid credentials");
    }
    return;
  }

  static async logout() {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    return;
  }
}
