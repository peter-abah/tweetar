import { baseUrl, defaultHeaders } from ".";

export interface User {
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  cover_image_url: string;
  authentication_token: string;
}

interface Error {
  error: string;
}

export type AuthResponse = User | Error;

export const authHeader = (user: User) => {
  const headers = { Authorization: user.authentication_token };
  return { ...headers, defaultHeaders };
};

export const loginUser = async (username: string, password: string) => {
  const requestBody = JSON.stringify({ username, password });
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    mode: "cors",
    body: requestBody,
  });

  return (await response.json()) as AuthResponse;
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

export const signUpUser = async (userParams: signUpParams) => {
  const requestBody = JSON.stringify(userParams);
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    mode: "cors",
    body: requestBody,
    headers: defaultHeaders,
  });

  return (await response.json()) as AuthResponse;
};
