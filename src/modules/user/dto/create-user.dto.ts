export type CreateUserDto = {
  name: string;
  email: string;
  avatarUrl?: string;
  password?: string;
  isPro: boolean;
};
