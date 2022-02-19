import { User } from "./users";
import { defaultHeaders, Client } from ".";

export const authHeader = (user: User) => {
  const headers = { Authorization: user.authentication_token };
  return { ...headers, ...defaultHeaders };
};

export interface loginParams {
  username: string;
  password: string;
}

export const loginUser = async (body: loginParams) => {
  const { data } = await Client.post("/login", body);
  if (data.error) throw data;

  return data as User;
};

export interface signUpParams {
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export const signUpUser = async (body: signUpParams) => {
  const { data } = await Client.post("/register", body);
  if (data.error) throw data;

  return data as User;
};
