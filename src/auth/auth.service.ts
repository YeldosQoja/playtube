import { Credentials, IAuthStrategy } from "./contracts/auth.strategy";

export class AuthService {
  private strategies = new Map<string, IAuthStrategy>();

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
}
