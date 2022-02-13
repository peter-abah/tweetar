import React, { useContext, useState } from "react";
import {
  Tweet,
  likeTweet,
  retweetTweet,
  deleteTweetLike,
  deleteTweetRetweet,
  TweetAction,
} from "../api/tweets";
import { User } from "../api/auth";
import { AuthContextInterface, useAuth } from "./authContext";

export interface TweetsContextInterface {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetsContext = React.createContext<TweetsContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const TweetsProvider = ({ children }: ProviderProps) => {
  const { user } = useAuth() as AuthContextInterface;

  const [tweets, setTweets] = useState<Tweet[]>([]);

  const like = async (user: User, tweet: Tweet) => {
    const id = tweet.tweet.id;
    const like = await likeTweet(user, id);
    const filteredTweets = tweets.filter(
      (tweet) => tweet.data_id !== like.data_id
    );
    setTweets([like, ...filteredTweets]);
  };

  const retweet = async (user: User, tweet: Tweet) => {
    const id = tweet.tweet.id;
    const retweet = await retweetTweet(user, id);
    const filteredTweets = tweets.filter(
      (tweet) => tweet.data_id !== retweet.data_id
    );
    setTweets([retweet, ...filteredTweets]);
  };

  const deleteLike = async (user: User, tweet: Tweet) => {
    await deleteTweetLike(user, tweet.tweet.id);

    const filteredTweets = tweets.filter((e) => e.data_id !== tweet.data_id);
    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        liked_by_user: false,
        likes_count: tweet.tweet.likes_count - 1,
      },
    };
    setTweets([tweet, ...filteredTweets]);
  };

  const deleteRetweet = async (user: User, tweet: Tweet) => {
    await deleteTweetRetweet(user, tweet.tweet.id);

    const filteredTweets = tweets.filter((e) => e.data_id !== tweet.data_id);
    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        retweeted_by_user: false,
        retweets_count: tweet.tweet.retweets_count - 1,
      },
    };
    setTweets([tweet, ...filteredTweets]);
  };

  const toggleLike = (tweet_id: string) => {
    if (!user) return;

    let tweet = tweets.filter((tweet) => tweet.data_id === tweet_id)[0];
    if (tweet.tweet.liked_by_user) {
      deleteLike(user, tweet);
    } else {
      like(user, tweet);
    }
  };

  const toggleRetweet = (tweet_id: string) => {
    if (!user) return;

    let tweet = tweets.filter((tweet) => tweet.data_id === tweet_id)[0];
    if (tweet.tweet.retweeted_by_user) {
      deleteRetweet(user, tweet);
    } else {
      retweet(user, tweet);
    }
  };

  const providerValue = { tweets, setTweets, toggleLike, toggleRetweet };

  return (
    <TweetsContext.Provider value={providerValue}>
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweets = () => useContext(TweetsContext);
