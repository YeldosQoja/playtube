import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";
import { IAuthGateway } from "../contracts/auth.gateway";

export interface SessionCredentials extends Credentials {
  email: string;
  redirectTo?: string;
}

export class SessionStrategy implements IAuthStrategy<SessionCredentials> {
  private authGateway: IAuthGateway;

  constructor(authGateway: IAuthGateway) {
    this.authGateway = authGateway;
  }

  async authenticate(credentials: SessionCredentials) {
    return this.startEmailFlow(credentials);
  }

  async register(credentials: SessionCredentials) {
    return this.startEmailFlow(credentials);
  }

  async revoke(): Promise<void> {
    await this.authGateway.signOut({
      redirect: false,
      redirectTo: "/auth/signin",
    });
  }

  refresh(): Promise<string | null> {
    return Promise.resolve(null);
  }

  private async startEmailFlow(credentials: SessionCredentials) {
    console.log({ credentials });
    const redirectTo = await this.authGateway.signIn("resend", {
      email: credentials.email,
      redirect: false,
      redirectTo: credentials.redirectTo ?? "/",
    });

    return {
      message: `Magic link sent to ${credentials.email}.`,
      redirectTo,
    };
  }
}
