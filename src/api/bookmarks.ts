import { Client, Params, headers } from ".";
import { User } from "./users";
import { Tweet, TweetsResponse } from "./tweets";

export const bookmarkTweet = async (currentUser: User, tweetId: string) => {
  const { data } = await Client.post(
    `/tweets/${tweetId}/bookmarks/`,
    {},
    {
      headers: headers(currentUser),
    }
  );

  if (data.error) throw data;

  return data as Tweet;
};

export const deleteTweetBookmark = async (
  currentUser: User,
  tweetId: string
) => {
  const { data, status } = await Client.delete(
    `/tweets/${tweetId}/bookmarks/`,
    {
      headers: headers(currentUser),
    }
  );

  if (status === 204) return;

  // response will have a body if there is an error
  throw data;
};

export const getBookmarks = async (currentUser: User, params: Params = {}) => {
  const { data } = await Client.get("/bookmarks", {
    headers: headers(currentUser),
    params,
  });

  if (data.error) throw data;

  return data as TweetsResponse;
};
