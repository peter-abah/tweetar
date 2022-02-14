import React, { useContext, useState, useEffect } from "react";
import {
  loginUser,
  signUpUser,
  AuthResponse,
  signUpParams,
  loginParams,
} from "../api/auth";
import { User } from "../api/users";

export interface AuthContextInterface {
  user: User | null;
  login: (userParams: loginParams) => Promise<AuthResponse>;
  signUp: (userParams: signUpParams) => Promise<AuthResponse>;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJson = window.localStorage.getItem("user");

    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);

  useEffect(() => {
    const userJson = JSON.stringify(user);
    window.localStorage.setItem("user", userJson);
  }, [user]);

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
    window.localStorage.removeItem("user");
  };

  const providerValue = {
    user,
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
  return useContext(AuthContext);
};
