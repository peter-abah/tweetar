import React, { useContext, useEffect, useState } from "react";
import {
  Tweet,
  likeTweet,
  retweetTweet,
  deleteTweetLike,
  deleteTweetRetweet,
} from "../api/tweets";
import { User } from "../api/users";
import { AuthContextInterface, useAuth } from "./authContext";

export interface TweetsContextInterface {
  tweet: Tweet | null;
  setTweet: (tweet: Tweet) => void;
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
  const [tweet, setTweet] = useState<Tweet | null>(null);

  const findTweetIndex = (tweet: Tweet) => {
    return tweets.findIndex((e) => e.data_id === tweet.data_id);
  };

  const updateTweets = (updatedTweet: Tweet) => {
    if (updatedTweet.data_id === tweet?.data_id) {
      setTweet(updatedTweet);
      return;
    }

    const index = findTweetIndex(updatedTweet);
    if (index < 0) return;

    const filteredTweets = tweets.filter((e) => e.data_id !== updatedTweet.data_id);
    filteredTweets.splice(index, 0, updatedTweet);
    setTweets(filteredTweets);
  };

  const like = async (user: User, tweet: Tweet) => {
    const id = tweet.tweet.id;
    const like = await likeTweet(user, id);

    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        liked_by_user: like.tweet.liked_by_user,
        likes_count: like.tweet.likes_count,
      },
    };

    updateTweets(tweet);
  };

  const retweet = async (user: User, tweet: Tweet) => {
    const id = tweet.tweet.id;
    const retweet = await retweetTweet(user, id);

    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        retweeted_by_user: retweet.tweet.retweeted_by_user,
        retweets_count: retweet.tweet.retweets_count,
      },
    };

    updateTweets(tweet);
  };

  const deleteLike = async (user: User, tweet: Tweet) => {
    await deleteTweetLike(user, tweet.tweet.id);

    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        liked_by_user: false,
        likes_count: tweet.tweet.likes_count - 1,
      },
    };

    updateTweets(tweet);
  };

  const deleteRetweet = async (user: User, tweet: Tweet) => {
    await deleteTweetRetweet(user, tweet.tweet.id);

    tweet = {
      ...tweet,
      tweet: {
        ...tweet.tweet,
        retweeted_by_user: false,
        retweets_count: tweet.tweet.retweets_count - 1,
      },
    };

    updateTweets(tweet);
  };

  const toggleLike = (tweet_id: string) => {
    if (!user) return;

    let filteredTweet = tweets.filter((tweet) => tweet.data_id === tweet_id)[0];
    filteredTweet = tweet?.data_id === tweet_id ? tweet : filteredTweet;
  
    if (filteredTweet.tweet.liked_by_user) {
      deleteLike(user, filteredTweet);
    } else {
      like(user, filteredTweet);
    }
  };

  const toggleRetweet = (tweet_id: string) => {
    if (!user) return;

    let filteredTweet = tweets.filter((tweet) => tweet.data_id === tweet_id)[0];
    filteredTweet = tweet?.data_id === tweet_id ? tweet : filteredTweet;
  
    if (filteredTweet.tweet.retweeted_by_user) {
      deleteRetweet(user, filteredTweet);
    } else {
      retweet(user, filteredTweet);
    }
  };

  const providerValue = {
    tweet,
    tweets,
    setTweet,
    setTweets,
    toggleLike,
    toggleRetweet,
  };

  return (
    <TweetsContext.Provider value={providerValue}>
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweets = () => {
  const values = useContext(TweetsContext);

  useEffect(() => values?.setTweets([]), []); // empty tweets first time it is called

  return values;
};
