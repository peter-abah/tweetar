import { useState, useEffect } from "react";
import { getFeed, likeTweet, retweetTweet, Tweet as Itweet } from "../api/tweets";
import Tweets from "../components/Tweets";
import { useAuth, AuthContextInterface } from "../contexts/authContext";
import { useTweets, TweetsContextInterface } from "../contexts/tweetsContext";

const Home = () => {
  const { user } = useAuth() as AuthContextInterface;
  const { setTweets } = useTweets() as TweetsContextInterface;

  useEffect(() => {
    getFeed(user)
      .then((data) => setTweets(data.list));
  }, [user]);

  return (
    <main>
      <Tweets/>
    </main>
  );
};

export default Home;
