import { IAuthGateway } from "../contracts/auth.gateway";
import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";

export interface OAuthCredentials extends Credentials {
  redirectTo?: string;
}

export class OAuthStrategy implements IAuthStrategy<OAuthCredentials> {
  constructor(
    private provider: "apple" | "github" | "google",
    private authGateway: IAuthGateway,
  ) {}

  async authenticate(credentials: OAuthCredentials) {
    const redirectTo = await this.authGateway.signIn(this.provider, {
      redirect: false,
      redirectTo: credentials.redirectTo ?? "/",
    });

    return { redirectTo };
  }

  async register(credentials: OAuthCredentials) {
    return this.authenticate(credentials);
  }

  async revoke(): Promise<void> {
    await this.authGateway.signOut({
      redirect: false,
      redirectTo: "/auth/signin",
    });
  }

  async refresh(): Promise<string | null> {
    return null;
  }
}
