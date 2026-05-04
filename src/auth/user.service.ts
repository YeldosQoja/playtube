import { IUserRepository } from "./contracts/user.repository";
import { IUserService, UserCreate, UserUpdate } from "./contracts/user.service";
import { User } from "./contracts/user";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(user: UserCreate): Promise<User> {
    return this.userRepository.add({
      ...user,
      email: this.normalizeEmail(user.email),
    });
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(this.normalizeEmail(email), true);
  }

  async update(id: string, user: UserUpdate): Promise<User> {
    return this.userRepository.update(id, user);
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }
}
