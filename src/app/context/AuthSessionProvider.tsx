"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
