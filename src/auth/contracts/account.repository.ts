import { Account, AccountCreate, AccountUpdate } from "./account";

export interface IAccountRepository {
  add(account: AccountCreate): Promise<Account>;
  upsert(account: AccountCreate): Promise<Account>;
  getById(id: string): Promise<Account | null>;
  getByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null>;
  getByUserId(userId: string): Promise<Account[]>;
  update(id: string, account: AccountUpdate): Promise<Account>;
  deleteById(id: string): Promise<Account | null>;
  deleteByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null>;
}
