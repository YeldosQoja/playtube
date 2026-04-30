import { signIn, signOut } from "@/auth";

import {
  IAuthGateway,
  AuthGatewaySignInOptions,
  AuthGatewaySignOutOptions,
} from "../contracts/auth.gateway";

export class NextAuthGateway implements IAuthGateway {
  async signIn(provider: string, options?: AuthGatewaySignInOptions) {
    return await signIn(provider, options);
  }

  async signOut(options?: AuthGatewaySignOutOptions) {
    await signOut(options);
  }
}

export const nextAuthGateway = new NextAuthGateway();
