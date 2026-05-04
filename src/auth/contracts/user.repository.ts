import { User } from "./user";

export interface IUserRepository {
  add(user: Omit<User, "id">): Promise<User>;
  getById(id: string, accounts?: boolean): Promise<User | null>;
  getByEmail(email: string, accounts?: boolean): Promise<User | null>;
  update(id: string, user: Partial<Omit<User, "id" | "email">>): Promise<User>;
}
