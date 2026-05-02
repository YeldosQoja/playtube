import { signIn, signOut } from "..";
import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";

export interface SessionCredentials extends Credentials {
  email: string;
  redirectTo?: string;
}

export class SessionStrategy implements IAuthStrategy<SessionCredentials> {
  constructor() {}

  async authenticate(credentials: SessionCredentials) {
    this.startEmailFlow(credentials);
  }

  async register(credentials: SessionCredentials) {
    this.startEmailFlow(credentials);
  }

  async revoke(): Promise<void> {
    await signOut({
      redirect: false,
      redirectTo: "/auth/signin",
    });
  }

  refresh(): Promise<string | null> {
    return Promise.resolve(null);
  }

  private async startEmailFlow(credentials: SessionCredentials) {
    await signIn("resend", {
      email: credentials.email,
      redirect: false,
      redirectTo: credentials.redirectTo ?? "/",
    });
  }
}
