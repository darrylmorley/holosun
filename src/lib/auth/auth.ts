import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/db/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // profile(profile) { console.log(profile); return profile; }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  // pages: {
  //   signIn: config.redirects.toLogin,
  // },
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
