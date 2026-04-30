import { eq } from "drizzle-orm";

import { IAuthUserRepository } from "../contracts/auth-user.repository";
import { AuthUser } from "../contracts/auth.user";
import { db } from "@/db";
import { authUsers } from "@/db/schema";

class AuthUserRepository implements IAuthUserRepository {
  async add(user: Omit<AuthUser, "id">): Promise<AuthUser> {
    const [createdUser] = await db
      .insert(authUsers)
      .values({
        username: user.username ?? null,
        name: user.name ?? null,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? null,
        image: user.image ?? null,
      })
      .returning();

    return createdUser;
  }

  async getById(id: string): Promise<AuthUser | null> {
    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.id, id))
      .limit(1);

    return user ?? null;
  }

  async getByEmail(email: string): Promise<AuthUser | null> {
    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email))
      .limit(1);

    return user ?? null;
  }

  async update(
    id: string,
    user: Partial<Omit<AuthUser, "id" | "email">>,
  ): Promise<AuthUser> {
    const [updatedUser] = await db
      .update(authUsers)
      .set({
        username: user.username,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        image: user.image,
        updatedAt: new Date(),
      })
      .where(eq(authUsers.id, id))
      .returning();

    if (!updatedUser) {
      throw new Error(`Auth user ${id} was not found.`);
    }

    return updatedUser;
  }
}

export const authUserRepository = new AuthUserRepository();
