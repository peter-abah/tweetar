import React, { useContext, useState } from "react";
import { loginUser, signUpUser, AuthResponse, User } from "../api/auth";

export interface ContextInterface {
  user: User | null;
  login: (username: string, password: string) => Promise<AuthResponse>;
  signUp: (
    username: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<AuthResponse>;
}

const AuthContext = React.createContext<ContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);

    if (!('error' in data)) {
      setUser(data);
    }

    return data;
  };

  const signUp = async (
    username: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const data = await signUpUser(username, password, passwordConfirmation);

    if (!('error' in data)) {
      setUser(data);
    }

    return data;
  };

  const providerValue = {
    user: user,
    login: login,
    signUp: signUp,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
