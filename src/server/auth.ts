// import { PrismaAdapter } from "@auth/prisma-adapter";
// import {
//   getServerSession,
//   type NextAuthOptions,
//   type DefaultSession,
// } from "next-auth";
// import { db } from "@/lib/db";
// import bcrypt from "bcrypt";
// import Credentials from "next-auth/providers/credentials";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: DefaultSession["user"] & {
//       id: string;
//       // ...other properties
//       //   role: UserRole;
//     };
//   }

// }

// export const authOptions: NextAuthOptions = {
//   //@ts-ignore
//   adapter: PrismaAdapter(db),
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       //@ts-ignore
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Please enter an email and password");
//         }
//         const client = await db.client.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//           select: {
//             password: true,
//             email: true,
//             id: true,
//           },
//         });
//         const lawyer = await db.lawyer.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//           select: {
//             password: true,
//             email: true,
//             id: true,
//           },
//         });

//         const admin = await db.admin.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//           select: {
//             password: true,
//             email: true,
//             id: true,
//           },
//         });

//         const user = client
//           ? { ...client, type: "client", id: client.id }
//           : admin
//           ? { ...admin, type: "admin", id: admin.id }
//           : { ...lawyer, type: "lawyer", id: lawyer?.id };

//         if (!user || !user.password) {
//           throw new Error("No user found");
//         }

//         const passwordMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!passwordMatch) {
//           throw new Error("Incorrect password");
//         }

//         return {
//           email: user.email,
//           id: user.id,
//           image: {
//             type: user.type,
//             id: user.id,
//           },
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXT_AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 1 Day
//   },
//   debug: process.env.NODE_ENV === "development",
//   pages: {
//     signIn: "/signin",
//   },
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  */
// export const getServerAuthSession = () => getServerSession(authOptions);

import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      //   role: UserRole;
    };
  }
}

export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        const client = await db.client.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });
        const lawyer = await db.lawyer.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });

        const admin = await db.admin.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            password: true,
            email: true,
            id: true,
          },
        });

        const user = client
          ? { ...client, type: "client", id: client.id }
          : admin
          ? { ...admin, type: "admin", id: admin.id }
          : { ...lawyer, type: "lawyer", id: lawyer?.id };

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          email: user.email,
          id: user.id,
          image: {
            type: user.type,
            id: user.id,
          },
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle user creation/linking for Google sign-in
      if (account?.provider === "google" && user?.email) {
        // Check if user exists in any of your user tables
        const client = await db.client.findUnique({
          where: { email: user.email },
        });

        const lawyer = await db.lawyer.findUnique({
          where: { email: user.email },
        });

        const admin = await db.admin.findUnique({
          where: { email: user.email },
        });

        // If user doesn't exist, you might want to create them
        // For this example, we'll just check if they exist
        if (!client && !lawyer && !admin) {
          // You could create a new client account here
          // Or return false to prevent sign in
          // For now, we'll allow sign in and handle account creation elsewhere
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Add custom claims to the JWT
      if (user) {
        token.id = user.id;
        if (account?.provider === "credentials") {
          token.image = user.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom session properties
      if (token && session.user) {
        session.user.id = token.id as string;
        if (token.image) {
          session.user.image = token.image as any;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Day
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
