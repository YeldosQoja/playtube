import { and, eq } from "drizzle-orm";
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";

import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

type DbUser = typeof users.$inferSelect;
type DbAccount = typeof accounts.$inferSelect;
type DbSession = typeof sessions.$inferSelect;
type DbVerificationToken = typeof verificationTokens.$inferSelect;

function mapUser(user: DbUser): AdapterUser {
  return {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    name: user.name,
  };
}

function mapAccount(account: DbAccount): AdapterAccount {
  return {
    userId: account.userId,
    type: account.type as AdapterAccount["type"],
    provider: account.provider,
    providerAccountId: account.providerAccountId,
    refresh_token: account.refreshToken ?? undefined,
    access_token: account.accessToken ?? undefined,
    expires_at: account.expiresAt ?? undefined,
    token_type:
      (account.tokenType as AdapterAccount["token_type"] | null) ?? undefined,
    scope: account.scope ?? undefined,
    id_token: account.idToken ?? undefined,
    session_state: account.sessionState ?? undefined,
  };
}

function mapSession(session: DbSession): AdapterSession {
  return {
    sessionToken: session.sessionToken,
    userId: session.userId,
    expires: session.expires,
  };
}

function mapVerificationToken(
  verificationToken: DbVerificationToken,
): VerificationToken {
  return {
    identifier: verificationToken.identifier,
    token: verificationToken.token,
    expires: verificationToken.expires,
  };
}

export function DrizzleAuthAdapter(): Adapter {
  return {
    async createUser(user) {
      const [createdUser] = await db
        .insert(users)
        .values({
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image ?? null,
          name: user.name ?? null,
        })
        .returning();

      return mapUser(createdUser);
    },
    async getUser(id) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return user ? mapUser(user) : null;
    },
    async getUserByEmail(email) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return user ? mapUser(user) : null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const [result] = await db
        .select({
          user: users,
        })
        .from(accounts)
        .innerJoin(users, eq(accounts.userId, users.id))
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId),
          ),
        )
        .limit(1);

      return result ? mapUser(result.user) : null;
    },
    async updateUser(user) {
      const [updatedUser] = await db
        .update(users)
        .set({
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          name: user.name,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
        .returning();

      if (!updatedUser) {
        throw new Error(`User ${user.id} was not found.`);
      }

      return mapUser(updatedUser);
    },
    async deleteUser(userId) {
      const [deletedUser] = await db
        .delete(users)
        .where(eq(users.id, userId))
        .returning();

      return deletedUser ? mapUser(deletedUser) : null;
    },
    async linkAccount(account) {
      const [linkedAccount] = await db
        .insert(accounts)
        .values({
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token ?? null,
          accessToken: account.access_token ?? null,
          expiresAt: account.expires_at ?? null,
          tokenType: account.token_type ?? null,
          scope: account.scope ?? null,
          idToken: account.id_token ?? null,
          sessionState: account.session_state
            ? String(account.session_state)
            : null,
        })
        .onConflictDoUpdate({
          target: [accounts.provider, accounts.providerAccountId],
          set: {
            accessToken: account.access_token ?? null,
            expiresAt: account.expires_at ?? null,
            idToken: account.id_token ?? null,
            refreshToken: account.refresh_token ?? null,
            scope: account.scope ?? null,
            sessionState: account.session_state
              ? String(account.session_state)
              : null,
            tokenType: account.token_type ?? null,
            updatedAt: new Date(),
            userId: account.userId,
          },
        })
        .returning();

      return linkedAccount ? mapAccount(linkedAccount) : null;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      const [account] = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId),
          ),
        )
        .returning();

      return account ? mapAccount(account) : undefined;
    },
    async getAccount(providerAccountId, provider) {
      const [account] = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId),
          ),
        )
        .limit(1);

      return account ? mapAccount(account) : null;
    },
    async createSession(session) {
      const [createdSession] = await db
        .insert(sessions)
        .values({
          expires: session.expires,
          sessionToken: session.sessionToken,
          userId: session.userId,
        })
        .returning();

      return mapSession(createdSession);
    },
    async getSessionAndUser(sessionToken) {
      const [result] = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .innerJoin(users, eq(sessions.userId, users.id))
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1);

      if (!result) {
        return null;
      }

      return {
        session: mapSession(result.session),
        user: mapUser(result.user),
      };
    },
    async updateSession(session) {
      const [updatedSession] = await db
        .update(sessions)
        .set({
          expires: session.expires,
          userId: session.userId,
        })
        .where(eq(sessions.sessionToken, session.sessionToken))
        .returning();

      return updatedSession ? mapSession(updatedSession) : null;
    },
    async deleteSession(sessionToken) {
      const [deletedSession] = await db
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning();

      return deletedSession ? mapSession(deletedSession) : null;
    },
    async createVerificationToken(verificationToken) {
      const [createdToken] = await db
        .insert(verificationTokens)
        .values({
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires,
        })
        .returning();

      return createdToken ? mapVerificationToken(createdToken) : null;
    },
    async useVerificationToken({ identifier, token }) {
      const [verificationToken] = await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token),
          ),
        )
        .returning();

      return verificationToken ? mapVerificationToken(verificationToken) : null;
    },
  };
}
