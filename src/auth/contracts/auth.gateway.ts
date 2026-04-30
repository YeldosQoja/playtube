export interface AuthGatewaySignInOptions {
  redirect?: boolean;
  redirectTo?: string;
  [key: string]: unknown;
}

export interface AuthGatewaySignOutOptions {
  redirect?: boolean;
  redirectTo?: string;
}

export interface IAuthGateway {
  signIn(provider: string, options?: AuthGatewaySignInOptions): Promise<string>;
  signOut(options?: AuthGatewaySignOutOptions): Promise<void>;
}
