import { signIn, signOut } from "..";
import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";

export interface OAuthCredentials extends Credentials {
  redirectTo?: string;
}

export class OAuthStrategy implements IAuthStrategy<OAuthCredentials> {
  constructor(private provider: "apple" | "github" | "google") {}

  async authenticate(credentials: OAuthCredentials) {
    return await signIn(this.provider, {
      redirect: true,
      redirectTo: credentials.redirectTo ?? "/",
    });
  }

  async register(credentials: OAuthCredentials) {
    return await this.authenticate(credentials);
  }

  async revoke(): Promise<void> {
    await signOut({
      redirect: true,
      redirectTo: "/auth/signin",
    });
  }

  async refresh(): Promise<string | null> {
    return null;
  }
}
