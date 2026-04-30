import { AuthService } from "../auth.service";
import { nextAuthGateway } from "./next-auth.gateway";
import { OAuthStrategy } from "./oauth.strategy";
import { SessionStrategy } from "./session.strategy";

export const authService = new AuthService()
  .addStrategy("email", new SessionStrategy(nextAuthGateway))
  .addStrategy("google", new OAuthStrategy("google", nextAuthGateway))
  .addStrategy("apple", new OAuthStrategy("apple", nextAuthGateway))
  .addStrategy("github", new OAuthStrategy("github", nextAuthGateway));
