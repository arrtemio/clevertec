import { AxiosResponse } from 'axios';

import { $auth } from '../../../http';

import { IPofile } from '../../../types/IPofile';
import { UploadFileResponse } from '../../../types/response/UploadFileResponse';


export class UserService {
  static async fetchUser(): Promise<AxiosResponse<IPofile>> {
    return $auth.get('/users/me');
  }

  static async updateUser(
    userId: number,
    password: string,
    email?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
  ): Promise<AxiosResponse<IPofile>> {
    return $auth.put(`/users/${userId}`, {
      password, email, username, firstName, lastName, phone
    });
  }

  static async uploadFile(files: FormData): Promise<AxiosResponse<UploadFileResponse[]>> {
    return $auth.post('/upload', files)
  }

  static async changeAvatar(userId: number, avatar: number): Promise<AxiosResponse<IPofile>> {
    return $auth.put(`/users/${userId}`, {avatar});
  }
}
