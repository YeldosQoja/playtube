import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import Apple from "next-auth/providers/apple";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { EmailConfig } from "next-auth/providers/email";

import { DrizzleAuthAdapter } from "./lib/drizzle-adapter";
import { sendVerificationRequest } from "./lib/send-verification-request";

const emailProvider: EmailConfig = {
  id: "email",
  type: "email",
  name: "Email",
  from: "auth@playtube.mov",
  maxAge: 15 * 60,
  sendVerificationRequest,
};

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
  providers: [Resend({ from: "auth@playtube.mov" }), Google, Apple, Github],
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
