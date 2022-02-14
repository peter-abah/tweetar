import { baseUrl, defaultHeaders } from ".";
import { authHeader } from "./auth";
import stringifyParams, { Params } from "./stringifyParams";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_image_url: string;
  cover_image_url: string;
  authentication_token: string;
  followers_count: number;
  followed_users_count: number;
  created_at: string;
}

export const getUser = async (idOrUsername: string, user: User | null, params: Params = {}) => {
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/users/${idOrUsername}/${stringParams}`;
  const headers = user ? authHeader(user) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data
};