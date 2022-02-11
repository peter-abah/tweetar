import React, { useContext, useState } from "react";
import {
  loginUser,
  signUpUser,
  AuthResponse,
  User,
  signUpParams,
  loginParams,
} from "../api/auth";

export interface ContextInterface {
  user: User | null;
  login: (userParams: loginParams) => Promise<AuthResponse>;
  signUp: (userParams: signUpParams) => Promise<AuthResponse>;
}

const AuthContext = React.createContext<ContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userParams: loginParams) => {
    const data = await loginUser(userParams);

    if ("error" in data) throw data;

    setUser(data);
    return data;
  };

  const signUp = async (userParams: signUpParams) => {
    const data = await signUpUser(userParams);

    if ("error" in data) throw data;

    setUser(data);
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
};
