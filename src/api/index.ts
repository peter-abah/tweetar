import axios from "axios";
import { User } from "./users";
import { authHeader } from "./auth";

export const baseURL = "https://tweetarapi.onrender.com/api/v1";
// export const baseURL = "http://localhost:3001/api/v1" //dev

export interface ListResponse<T> {
  list: T[];
  current_page: number;
  total_size: number;
  total_pages: number;
  next_page?: number;
  size: number;
}

export interface Params {
  [index: string]: any;
}

export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const headers = (user: User | null) => {
  return user?.authentication_token ? authHeader(user) : defaultHeaders;
};

export const Client = axios.create({ baseURL, headers: defaultHeaders });
