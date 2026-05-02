import fs from "node:fs/promises";
import NextAuth from "next-auth";
import { authConfig } from "./config";
import { JWTService } from "./lib/jwt.service";
import { AuthService } from "./auth.service";
import { OAuthStrategy } from "./lib/oauth.strategy";
import { SessionStrategy } from "./lib/session.strategy";

export const { handlers, auth, signIn, signOut, unstable_update } =
  NextAuth(authConfig);

export { authConfig };

const JWT_KEY =
  process.env["JWT_KEY"] ||
  (await fs.readFile("./jwt-private-key.pem")).toString("utf-8");
const JWT_KEY_FORMAT = process.env["JWT_KEY_FORMAT"] || "PKCS#8";

const jwtService = new JWTService(JWT_KEY, JWT_KEY_FORMAT);

export const authService = new AuthService(jwtService)
  .addStrategy("email", new SessionStrategy())
  .addStrategy("google", new OAuthStrategy("google"))
  .addStrategy("apple", new OAuthStrategy("apple"))
  .addStrategy("github", new OAuthStrategy("github"));
