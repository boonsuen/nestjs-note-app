import axios from 'axios';
import BaseHttpService from './base-http.service';

export interface SignUpResponse {
  username: string;
}

export interface SignInResponse extends SignUpResponse {}

export default class AuthService extends BaseHttpService {
  async signUp(username: string, password: string): Promise<SignUpResponse> {
    const result = await axios.post<SignUpResponse>(
      `${this.API_BASE_URL}/auth/signup`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    return result.data;
  }

  async signIn(username: string, password: string): Promise<SignInResponse> {
    const result = await axios.post<SignInResponse>(
      `${this.API_BASE_URL}/auth/signin`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    return result.data;
  }

  async signOut(): Promise<void> {
    await this.post('auth/signout', {});
  }
}
