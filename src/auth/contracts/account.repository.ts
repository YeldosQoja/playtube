import { Account, AccountCreate, AccountUpdate } from "./account";

export interface IAccountRepository {
  add(account: AccountCreate): Promise<Account>;
  upsert(account: AccountCreate): Promise<Account>;
  getById(id: string, includeUser?: boolean): Promise<Account | null>;
  getByProviderAccount(
    provider: string,
    providerAccountId: string,
    includeUser?: boolean,
  ): Promise<Account | null>;
  getByUserId(userId: string, includeUser?: boolean): Promise<Account[]>;
  update(id: string, account: AccountUpdate): Promise<Account>;
  deleteById(id: string): Promise<Account | null>;
  deleteByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null>;
}
