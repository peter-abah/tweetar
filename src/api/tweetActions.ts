import { Client, Params, headers } from ".";
import { User } from "./users";
import { Tweet, TweetsResponse } from "./tweets";

export const retweetTweet = async (currentUser: User, tweetId: string) => {
  const { data } = await Client.post(
    `/tweets/${tweetId}/retweets`,
    {},
    {
      headers: headers(currentUser),
    }
  );
  if (data.error) throw data;

  return data as Tweet;
};

export const deleteTweetRetweet = async (
  currentUser: User,
  tweetId: string
) => {
  const { data, status } = await Client.delete(`/tweets/${tweetId}/retweets`, {
    headers: headers(currentUser),
  });
  if (status === 204) return; // no content

  // response will have a body if there is an error
  throw data;
};

export const likeTweet = async (currentUser: User, tweetId: string) => {
  const { data } = await Client.post(
    `/tweets/${tweetId}/likes`,
    {},
    {
      headers: headers(currentUser),
    }
  );
  if (data.error) throw data;

  return data as Tweet;
};

export const deleteTweetLike = async (currentUser: User, tweetId: string) => {
  const { data, status } = await Client.delete(`/tweets/${tweetId}/likes`, {
    headers: headers(currentUser),
  });
  if (status === 204) return; // no content

  // response will have a body if there is an error
  throw data;
};

interface Options {
  owner: "tweet" | "user";
  id: string;
  model: "retweet" | "like";
}
export const getTweetAction = async (
  currentUser: User | null,
  options: Options,
  params: Params = {}
) => {
  const { data } = await Client.get(
    `${options.owner}s/${options.id}/${options.model}s`,
    {
      params,
      headers: headers(currentUser),
    }
  );
  if (data.error) throw data;

  return data as TweetsResponse;
};

export const getUserRetweets = async (
  currentUser: User | null,
  userId: string,
  params: Params
) => {
  return getTweetAction(
    currentUser,
    {
      owner: "user",
      id: userId,
      model: "retweet",
    },
    params
  );
};

export const getTweetRetweets = async (
  currentUser: User | null,
  tweetId: string,
  params: Params
) => {
  return getTweetAction(
    currentUser,
    {
      owner: "tweet",
      id: tweetId,
      model: "retweet",
    },
    params
  );
};

export const getUserLikes = async (
  currentUser: User | null,
  userId: string,
  params: Params
) => {
  return getTweetAction(
    currentUser,
    {
      owner: "user",
      id: userId,
      model: "like",
    },
    params
  );
};

export const getTweetLikes = async (
  currentUser: User | null,
  tweetId: string,
  params: Params
) => {
  return getTweetAction(
    currentUser,
    {
      owner: "tweet",
      id: tweetId,
      model: "like",
    },
    params
  );
};
