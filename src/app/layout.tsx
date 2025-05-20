import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./context/ReactQueryProvider";
import AuthSessionProvider from "./context/AuthSessionProvider";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "EQUILEX",
  description: "client-lawyer bridge",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <ReactQueryProvider>
            <AuthSessionProvider session={session}>
              <Toaster/>
              {children}
            </AuthSessionProvider>
          </ReactQueryProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
