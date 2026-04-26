import { IAuthUserRepository } from "../contracts/auth-user.repository";
import { AuthUser } from "../contracts/auth.user";
import { db } from "@/db";
import { authUsers } from "@/db/schema/auth-users.sql.js";

class AuthUserRepository implements IAuthUserRepository {
  async add(
    username: string,
    email: string | null | undefined,
    password: Buffer,
    salt: Buffer,
  ): Promise<AuthUser> {
    const result = await db
      .insert(authUsers)
      .values({
        username,
        password,
        salt,
        email,
        createdAt: new Date().toISOString(),
      })
      .returning();
    const user = result[0] as AuthUser;
    return user;
  }

  async getByUsername(username: string): Promise<AuthUser | null> {
    const user = await db.query.authUsers.findFirst({
      where: (fields, operators) => operators.eq(fields.username, username),
    });

    if (!user) {
      return null;
    }

    return user;
  }
}

export const authUserRepository = new AuthUserRepository();
