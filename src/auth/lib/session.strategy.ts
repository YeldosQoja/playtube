import { signIn, signOut } from "..";
import { Credentials, IAuthStrategy } from "../contracts/auth.strategy";

export interface SessionCredentials extends Credentials {
  email: string;
  redirectTo?: string;
}

export class SessionStrategy implements IAuthStrategy<SessionCredentials> {
  constructor() {}

  async authenticate(credentials: SessionCredentials) {
    await this.startEmailFlow(credentials);
  }

  async register(credentials: SessionCredentials) {
    await this.startEmailFlow(credentials);
  }

  async revoke(): Promise<void> {
    await signOut({
      redirect: true,
      redirectTo: "/auth/signin",
    });
  }

  refresh(): Promise<string | null> {
    return Promise.resolve(null);
  }

  private async startEmailFlow(credentials: SessionCredentials) {
    const result = await signIn("resend", {
      email: credentials.email,
      redirect: true,
      redirectTo: credentials.redirectTo ?? "/",
    });

    console.log("email", { result });
  }
}
