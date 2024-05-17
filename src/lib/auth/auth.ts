import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/db/prisma";
import config from "@/lib/config/auth";

export const {
  handlers, signIn, signOut, auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
