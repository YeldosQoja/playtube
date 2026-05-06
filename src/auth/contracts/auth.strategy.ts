export interface Credentials {
  [key: string]: unknown;
}

export interface Session {
  [key: string]: unknown;
}

export interface IAuthStrategy<C extends Credentials = Credentials> {
  authenticate(credentials: C): Promise<unknown>;

  register(credentials: C): Promise<unknown>;

  revoke(token?: string): Promise<void>;

  refresh(token?: string): Promise<string | null>;
}
