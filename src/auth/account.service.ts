import { IAccountRepository } from "./contracts/account.repository";
import { Account, AccountCreate, AccountUpdate } from "./contracts/account";

export class AccountService {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async create(account: AccountCreate): Promise<Account> {
    return this.accountRepository.add(account);
  }

  async upsert(account: AccountCreate): Promise<Account> {
    return this.accountRepository.upsert(account);
  }

  async getById(
    id: string,
    includeUser?: boolean,
  ): Promise<Account | null> {
    return this.accountRepository.getById(id, includeUser);
  }

  async getByProviderAccount(
    provider: string,
    providerAccountId: string,
    includeUser?: boolean,
  ): Promise<Account | null> {
    return this.accountRepository.getByProviderAccount(
      provider,
      providerAccountId,
      includeUser,
    );
  }

  async getByUserId(
    userId: string,
    includeUser?: boolean,
  ): Promise<Account[]> {
    return this.accountRepository.getByUserId(userId, includeUser);
  }

  async update(id: string, account: AccountUpdate): Promise<Account> {
    return this.accountRepository.update(id, account);
  }

  async deleteById(id: string): Promise<Account | null> {
    return this.accountRepository.deleteById(id);
  }

  async deleteByProviderAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<Account | null> {
    return this.accountRepository.deleteByProviderAccount(
      provider,
      providerAccountId,
    );
  }
}
