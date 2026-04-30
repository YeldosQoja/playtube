import { AuthUser } from "./auth.user";

export interface IAuthUserRepository {
  add(user: Omit<AuthUser, "id">): Promise<AuthUser>;
  getById(id: string): Promise<AuthUser | null>;
  getByEmail(email: string): Promise<AuthUser | null>;
  update(
    id: string,
    user: Partial<Omit<AuthUser, "id" | "email">>,
  ): Promise<AuthUser>;
}
