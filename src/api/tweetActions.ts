import { baseUrl, defaultHeaders } from ".";
import { authHeader } from "./auth";
import { User } from "./users";
import stringifyParams, { Params } from "./stringifyParams";

export const retweetTweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/retweets`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const deleteTweetRetweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/retweets`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers,
  });

  if (res.status === 204) {
    // no content
    return;
  }

  // response will have a body if there is an error
  throw await res.json();
};

export const likeTweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/likes`;
  const headers = user ? authHeader(user) : {};

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const deleteTweetLike = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/likes`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers,
  });

  if (res.status === 204) {
    // no content
    return;
  }

  // response will have a body if there is an error
  throw await res.json();
};

export const getRetweets = async (
  currentUser: User | null,
  tweetId: string,
  params: Params = {}
) => {
  params = { ...params, tweet_id: tweetId }
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/retweets/${stringParams}`;
  const headers = currentUser ? authHeader(currentUser) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const getLikes = async (
  currentUser: User | null,
  tweetId: string,
  params: Params = {}
) => {
  params = { ...params, tweet_id: tweetId }
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/likes/${stringParams}`;
  const headers = currentUser ? authHeader(currentUser) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};