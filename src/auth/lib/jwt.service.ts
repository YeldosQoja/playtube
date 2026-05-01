import { IJWTService, JOSEHeader, JWTPayload } from "../contracts/jwt.service";
import * as jose from "jose";

export class JWTService implements IJWTService {
  private key: string;
  private keyFormat: string;

  constructor(key: string, keyFormat: string) {
    this.key = key;
    this.keyFormat = keyFormat;
  }

  async createSignature(
    headers: JOSEHeader,
    payload: JWTPayload,
  ): Promise<string> {
    const { alg, typ } = headers;

    let privateKey: jose.CryptoKey;
    if (this.keyFormat === "PKCS#8") {
      privateKey = await jose.importPKCS8(this.key, alg);
    } else {
      privateKey = await jose.importSPKI(this.key, alg);
    }

    const token = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg, typ })
      .sign(privateKey);

    return token;
  }

  setKey(key: string, format: string): void {
    this.key = key;
    this.keyFormat = format;
  }
}
