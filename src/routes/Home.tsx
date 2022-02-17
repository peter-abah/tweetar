import { useEffect } from "react";
import { getFeed } from "../api/tweets";

import { useAuth, AuthContextInterface } from "../contexts/authContext";
import { useTweets, TweetsContextInterface } from "../contexts/tweetsContext";

import Tweets from "../components/Tweets";
import Header from "../components/Header";

const Home = () => {
  const { user } = useAuth() as AuthContextInterface;
  const { setTweets } = useTweets() as TweetsContextInterface;

  useEffect(() => {
    getFeed(user)
      .then((data) => setTweets(data.list));
  }, [user]);

  return (
    <>
      <Header title="Home" />
      <Tweets/>
    </>
  );
};

export default Home;
