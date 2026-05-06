import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";
import Apple from "next-auth/providers/apple";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAuthAdapter } from "./lib/drizzle-adapter";
import { accountService, userService } from ".";
import { cookies } from "next/headers";

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
      }

      return session;
    },
    async signIn({ account, email, user }) {
      if (!account) return true;

      if (account.provider === "resend" && email?.verificationRequest) {
        return true;
      }

      const cookieStore = await cookies();
      const intent = cookieStore.get("auth_intent")?.value;

      if (intent === "signup") {
        return true;
      }

      const existingAccount = await accountService.getByProviderAccount(
        account.provider,
        account.providerAccountId,
      );

      if (existingAccount) return true;

      if (user.email) {
        const existingUser = await userService.getByEmail(user.email);

        if (!existingUser) {
          return "/auth/signin?error=not_registered";
        }

        return true;
      }

      return "/auth/signin?error=not_registered";
    },
  },
} satisfies NextAuthConfig;
