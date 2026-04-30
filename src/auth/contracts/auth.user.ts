export type AuthUser = {
  id: string;
  username?: string | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
};
