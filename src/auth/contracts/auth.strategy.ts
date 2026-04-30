import { AuthUser } from "./auth.user";

export interface Credentials {
  [key: string]: unknown;
}

export interface AuthStrategyResult {
  message?: string;
  redirectTo?: string;
  user?: AuthUser | null;
}

export interface IAuthStrategy<C extends Credentials = Credentials> {
  authenticate(credentials: C): Promise<AuthStrategyResult>;

  register(credentials: C): Promise<AuthStrategyResult>;

  revoke(token?: string): Promise<void>;

  refresh(token?: string): Promise<string | null>;
}
