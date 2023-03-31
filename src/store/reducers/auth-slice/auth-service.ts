import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../../types/response/AuthResponse';
import { ForgotPass } from '../../../types/auth/ForgotPass';
import { $host } from '../../../http';

export class AuthService {
  static async login(identifier: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $host.post<AuthResponse>('/local', {identifier, password});
  }

  static async registration(username: string, email: string, password: string, firstName: string, lastName: string, phone: string): Promise<AxiosResponse<AuthResponse>> {
    return $host.post<AuthResponse>('/local/register', {username, email, password, firstName, lastName, phone});
  }

  static logout(): void {
    return localStorage.removeItem('token');
  }

  static async forgotPassword(email:string): Promise<AxiosResponse<ForgotPass>> {
    return $host.post<ForgotPass>('/forgot-password', {email});
  }

  static async resetPassword(password: string, passwordConfirmation: string, code: string): Promise<AxiosResponse<AuthResponse>> {
    return $host.post('/reset-password', {password, passwordConfirmation, code});
  }
}
