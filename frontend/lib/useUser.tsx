import { useState } from 'react';
import AuthService, {
  SignInResponse,
  SignUpResponse,
} from '../services/auth.service';

const useUser = () => {
  const [username, setUsername] = useState<string | null>(null);
  const authService = new AuthService();

  const signUp = async (
    username: string,
    password: string,
  ): Promise<SignUpResponse> => {
    const signUpResponse = await authService.signUp(username, password);
    return signUpResponse;
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<SignInResponse> => {
    const signInResponse = await authService.signIn(username, password);
    return signInResponse;
  };

  const signOut = async (): Promise<void> => {
    await authService.signOut();
  };

  return { username, signIn, signUp, signOut };
};

export default useUser;
