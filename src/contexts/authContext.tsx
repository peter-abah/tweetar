import React, { useContext, useState, useEffect } from "react";
import { useBoolean, useLocalStorage } from "usehooks-ts";
import { loginUser, signUpUser, signUpParams, loginParams } from "../api/auth";
import { User } from "../api/users";

export interface AuthContextInterface {
  currentUser: User | null;
  isLoading: boolean;
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
  const { value: isLoading, setValue: setIsLoading } = useBoolean(false);

  useEffect(() => {
    if (!currentUser?.authentication_token) setUser(null);
  }, [currentUser]);

  const login = async (userParams: loginParams) => {
    setIsLoading(true);
    try {
      const data = await loginUser(userParams);
      if ("error" in data) throw data;

      setUser(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userParams: signUpParams) => {
    setIsLoading(true);
    try {
      const data = await signUpUser(userParams);
      if ("error" in data) throw data;

      setUser(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
  };

  const providerValue = {
    currentUser,
    isLoading,
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
