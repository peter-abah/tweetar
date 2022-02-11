import { useState, useEffect } from "react";
import { getFeed } from "../api/tweets";
import Tweets from "../components/Tweets";
import { useAuth, ContextInterface } from "../contexts/authContext";

const Home = () => {
  const { user } = useAuth() as ContextInterface;
  const [tweets, setTweets] = useState<any>([])

  useEffect(() => {
    getFeed({ user })
      .then((data) => setTweets(data.list));
  }, []);

  return (
    <main>
      <Tweets tweets={tweets} />
    </main>
  );
};

export default Home;
