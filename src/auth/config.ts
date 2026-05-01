import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import Apple from "next-auth/providers/apple";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAuthAdapter } from "./lib/drizzle-adapter";

export const authConfig = {
  adapter: DrizzleAuthAdapter(),
  session: {
    strategy: "database",
  },
  pages: {
    error: "/auth/signin",
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  debug: true,
  providers: [
    Resend({
      id: "email",
      name: "Email",
      from: "auth@playtube.mov",
      maxAge: 15 * 60,
    }),
    Google,
    Apple,
    Github,
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
        session.user.id = user.id;
        session.user.image = user.image;
        session.user.name = user.name;
        session.user.firstName =
          "firstName" in user ? (user.firstName ?? null) : null;
        session.user.lastName =
          "lastName" in user ? (user.lastName ?? null) : null;
        session.user.username =
          "username" in user ? (user.username ?? null) : null;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
