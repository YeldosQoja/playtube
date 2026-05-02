import { signIn, signOut } from "..";
import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";

export interface OAuthCredentials extends Credentials {
  redirectTo?: string;
}

export class OAuthStrategy implements IAuthStrategy<OAuthCredentials> {
  constructor(private provider: "apple" | "github" | "google") {}

  async authenticate(credentials: OAuthCredentials) {
    await signIn(this.provider, {
      redirect: false,
      redirectTo: credentials.redirectTo ?? "/",
    });
  }

  async register(credentials: OAuthCredentials) {
    this.authenticate(credentials);
  }

  async revoke(): Promise<void> {
    await signOut({
      redirect: false,
      redirectTo: "/auth/signin",
    });
  }

  async refresh(): Promise<string | null> {
    return null;
  }
}
