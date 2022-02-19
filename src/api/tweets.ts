import { Client, headers, Params } from ".";
import { User } from "./users";

export interface Tweet {
  tweet: {
    id: string;
    body: string;
    user: User;
    replies_count: number;
    retweets_count: number;
    likes_count: number;
    liked_by_user: boolean;
    retweeted_by_user: boolean;
    parent: Tweet | null;
    updated_at: string;
    created_at: string;
  };
  type: "tweet" | "like" | "retweet";
  id: string;
  user?: User;
  data_id: string;
}

export interface TweetsResponse {
  list: Tweet[];
  current_page: number;
  total_size: number;
  total_pages: number;
  size: number;
}

export const getFeed = async (user: User | null, params: Params = {}) => {
  const { data } = await Client.get("/feed", {
    headers: headers(user),
    params,
  });
  if (data.error) throw data;

  return data as TweetsResponse;
};

export const getTweets = async (
  currentUser: User | null,
  params: Params = {}
) => {
  const { data } = await Client.get("/tweets", {
    headers: headers(currentUser),
    params,
  });
  if (data.error) throw data;

  return data as TweetsResponse;
};

interface tweetBody {
  tweet: {
    body: string;
    parent_id?: string;
  };
}
export const createTweet = async (currentUser: User, body: tweetBody) => {
  const { data } = await Client.post("/tweets", body, {
    headers: headers(currentUser),
  });
  if (data.error) throw data;

  return data as Tweet;
};

export const getTweet = async (
  currentUser: User | null,
  tweetId: string,
  params: Params = {}
) => {
  const { data } = await Client.get(`/tweets/${tweetId}`, {
    headers: headers(currentUser),
    params,
  });
  if (data.error) throw data;

  return data as Tweet;
};
