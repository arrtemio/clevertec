import { IUser } from '../IUser';

export interface AuthResponse {
  jwt: string;
  user: IUser;
}
