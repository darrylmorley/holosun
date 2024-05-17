import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";

import prisma from "@/lib/db/prisma";
import config from "@/lib/config/auth";
import { sendVerificationRequest } from "./sendVerificationRequest";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: config.redirects.toLogin,
  },
  //debug: true,
  callbacks: {
    async session({ session, user }) {
      if (user || session) {
        session.user.id = user.id;
        return session;
      }

      throw "User Not Found";
    },
  },
});
