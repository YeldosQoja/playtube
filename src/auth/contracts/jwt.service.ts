// JOSE Header
export interface JOSEHeader {
  alg: string;
  typ: string;
}

// a set of JWT claims
export interface JWTPayload {
  iss: string;
  aud: string;
  exp: number;
  sub: string;
}

export interface IJWTService {
  createSignature(headers: JOSEHeader, payload: JWTPayload): Promise<string>;
  setKey(key: string, format: string): void;
}
