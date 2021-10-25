import axios from 'axios';
import BaseHttpService from './base-http.service';

type TokenResponse = {
  accessToken: string;
  // TODO
  username: string;
};

export default class AuthService extends BaseHttpService {
  async signUp(username: string, password: string) {
    const result = await axios.post<TokenResponse>(
      `${this.API_BASE_URL}/auth/signup`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );

    const { accessToken } = result.data;
    this.saveToken(accessToken);
  }

  async signIn(username: string, password: string) {
    const result = await axios.post<TokenResponse>(
      `${this.API_BASE_URL}/auth/signin`,
      {
        username,
        password,
      },
    );
    const { accessToken } = result.data;
    this.saveToken(accessToken);
    return result.data.username;
  }

  async getUser() {
    const result = await axios.get(`${this.API_BASE_URL}/auth`, {
      withCredentials: true,
    });
  }

  async signOut() {
    this.removeToken();
  }
}
