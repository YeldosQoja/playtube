export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string | null;
  accessToken?: string | null;
  expiresAt?: number | null;
  tokenType?: string | null;
  scope?: string | null;
  idToken?: string | null;
  sessionState?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountCreate = Omit<Account, "id" | "createdAt" | "updatedAt">;

export type AccountUpdate = Partial<AccountCreate>;
