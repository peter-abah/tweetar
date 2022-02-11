import { baseUrl } from ".";

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
  return { 'Authorization': user.authentication_token };
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

export const signUpUser = async (
  username: string,
  password: string,
  passwordConfirmation: string
) => {
  const requestBody = JSON.stringify({ username, password });
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    mode: "cors",
    body: requestBody,
  });

  return (await response.json()) as AuthResponse;
};
