import { Credentials, IAuthStrategy, Session } from "./contracts/auth.strategy";
import { IJWTService } from "./contracts/jwt.service";

export class AuthService {
  private strategies = new Map<string, IAuthStrategy>();

  constructor(private jwtService: IJWTService) {}

  addStrategy(name: string, strategy: IAuthStrategy) {
    this.strategies.set(name, strategy);
    return this;
  }

  private get(name: string): IAuthStrategy {
    const strategy = this.strategies.get(name);
    if (!strategy) throw new Error(`Unknown auth strategy: ${name}`);
    return strategy;
  }

  async authenticate(strategy: string, credentials: Credentials) {
    return await this.get(strategy).authenticate(credentials);
  }

  async register(strategy: string, credentials: Credentials) {
    return await this.get(strategy).register(credentials);
  }

  async revoke(strategy: string, token?: string) {
    return this.get(strategy).revoke(token);
  }

  async refresh(strategy: string, token?: string) {
    return this.get(strategy).refresh(token);
  }

  async mintInternalToken(session: Session) {
    return await this.jwtService.createSignature(
      { alg: "RS256", typ: "JWT" },
      {
        iss: "playtube-gateway",
        aud: "playtube-app",
        sub: session.userId as string,
        exp: Date.now() / 1000 + 60,
      },
    );
  }
}
