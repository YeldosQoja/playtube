import { and, eq } from "drizzle-orm";

import { IAccountRepository } from "../contracts/account.repository";
import { Account, AccountCreate, AccountUpdate } from "../contracts/account";
import { db } from "@/db";
import { accounts } from "@/db/schema";

class AccountRepository implements IAccountRepository {
  async add(account: AccountCreate): Promise<Account> {
    const [createdAccount] = await db
      .insert(accounts)
      .values({
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refreshToken: account.refreshToken ?? null,
        accessToken: account.accessToken ?? null,
        expiresAt: account.expiresAt ?? null,
        tokenType: account.tokenType ?? null,
        scope: account.scope ?? null,
        idToken: account.idToken ?? null,
        sessionState: account.sessionState ?? null,
      })
      .returning();

    return createdAccount;
  }

  async upsert(account: AccountCreate): Promise<Account> {
    const [upsertedAccount] = await db
      .insert(accounts)
      .values({
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refreshToken: account.refreshToken ?? null,
        accessToken: account.accessToken ?? null,
        expiresAt: account.expiresAt ?? null,
        tokenType: account.tokenType ?? null,
        scope: account.scope ?? null,
        idToken: account.idToken ?? null,
        sessionState: account.sessionState ?? null,
      })
      .onConflictDoUpdate({
        target: [accounts.provider, accounts.providerAccountId],
        set: {
          userId: account.userId,
          type: account.type,
          refreshToken: account.refreshToken ?? null,
          accessToken: account.accessToken ?? null,
          expiresAt: account.expiresAt ?? null,
          tokenType: account.tokenType ?? null,
          scope: account.scope ?? null,
          idToken: account.idToken ?? null,
          sessionState: account.sessionState ?? null,
          updatedAt: new Date(),
        },
      })
      .returning();

    return upsertedAccount;
  }

  async getById(id: string): Promise<Account | null> {
    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))
      .limit(1);

    return account ?? null;
  }

  async getByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null> {
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

    return account ?? null;
  }

  async getByUserId(userId: string): Promise<Account[]> {
    return db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId));
  }

  async update(id: string, account: AccountUpdate): Promise<Account> {
    const [updatedAccount] = await db
      .update(accounts)
      .set({
        ...account,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, id))
      .returning();

    if (!updatedAccount) {
      throw new Error(`Account ${id} was not found.`);
    }

    return updatedAccount;
  }

  async deleteById(id: string): Promise<Account | null> {
    const [account] = await db
      .delete(accounts)
      .where(eq(accounts.id, id))
      .returning();

    return account ?? null;
  }

  async deleteByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null> {
    const [account] = await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId),
        ),
      )
      .returning();

    return account ?? null;
  }
}

export const accountRepository = new AccountRepository();
