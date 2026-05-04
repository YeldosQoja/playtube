import { IUserRepository } from "../contracts/user.repository";
import { User } from "../contracts/user";
import { db } from "@/db";
import { users } from "@/db/schema";

class UserRepository implements IUserRepository {
  async add(user: Omit<User, "id">): Promise<User> {
    const [createdUser] = await db
      .insert(users)
      .values({
        name: user.name ?? null,
        email: user.email,
        emailVerified: user.emailVerified ?? null,
        image: user.image ?? null,
      })
      .returning();

    return createdUser;
  }

  async getById(id: string, accounts: boolean = true): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: (fields, operators) => operators.eq(fields.id, id),
      with: accounts ? { accounts: true } : undefined,
    });

    return user ?? null;
  }

  async getByEmail(
    email: string,
    accounts: boolean = true,
  ): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: (fields, operators) => operators.eq(fields.email, email),
      with: accounts ? { accounts: true } : undefined,
    });

    return user ?? null;
  }

  async update(
    id: string,
    user: Partial<Omit<User, "id" | "email">>,
  ): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        name: user.name,
        emailVerified: user.emailVerified,
        image: user.image,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw new Error(`User ${id} was not found.`);
    }

    return updatedUser;
  }
}

export const userRepository = new UserRepository();
