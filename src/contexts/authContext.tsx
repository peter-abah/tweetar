import React, { useContext, useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { loginUser, signUpUser, signUpParams, loginParams } from "../api/auth";
import { User } from "../api/users";

export interface AuthContextInterface {
  currentUser: User | null;
  login: (userParams: loginParams) => Promise<any>;
  signUp: (userParams: signUpParams) => Promise<any>;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [currentUser, setUser] = useLocalStorage<User | null>("user", null);

  useEffect(() => {
    if (!currentUser?.authentication_token) setUser(null);
  }, [currentUser]);

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

  const logOut = () => {
    setUser(null);
  };

  const providerValue = {
    currentUser,
    login,
    signUp,
    logOut,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextInterface;
};
