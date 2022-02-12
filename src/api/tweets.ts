import { baseUrl } from ".";
import { User, authHeader } from "./auth";
import stringifyParams, { Params } from "./stringifyParams";

export interface Tweet {
  id: string;
  body: string;
  user: User;
  replies_count: number;
  retweets_count: number;
  likes_count: number;
}

interface RequestInteface {
  params?: Params;
  user?: User | null;
}

const defaultParameter = { params: {}, user: null };

export const getFeed = async ({
  params = {},
  user = null,
}: RequestInteface = defaultParameter) => {
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/feed/${stringParams}`;
  const headers = user ? authHeader(user) : {};

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  return await res.json();
};

export const retweetTweet = async (user: User, tweet_id: string) => {
  const url = `${baseUrl}/retweets?tweet_id=${tweet_id}`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  return await res.json();
};

export const likeTweet = async (user: User, tweet_id: string) => {
  const url = `${baseUrl}/likes?tweet_id=${tweet_id}`;
  const headers = user ? authHeader(user) : {};

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  return await res.json();
};
