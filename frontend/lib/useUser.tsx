import { useState } from 'react';
import AuthService from '../services/auth.service'

const useUser = () => {
  const [username, setUsername] = useState<string | null>(null);
  const authService = new AuthService;

  const signUp = async (username: string, password: string): Promise<void> => {
    await authService.signUp(username, password);
  };

  const signIn = async (username: string, password: string) => {
    // username = await this.authService.signin(username, password);
  };

  const getUser = async () => {
    authService.getUser();
  }

  const signOut = () => {
    setUsername(null);
    authService.removeToken();
  };

  return { username, signIn, signUp, getUser, signOut };
};

export default useUser;
