import { User } from "./user";

export type UserCreate = Omit<User, "id">;
export type UserUpdate = Partial<Omit<User, "id" | "email">>;

export interface IUserService {
  create(user: UserCreate): Promise<User>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(id: string, user: UserUpdate): Promise<User>;
}
