import { User } from "./user";

export interface TokenData {
  accessToken: string;
  user: User;
}

export const TOKEN_DATA = 'tokenData';