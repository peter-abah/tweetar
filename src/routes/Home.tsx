import { useState, useEffect } from "react";
import { getFeed, likeTweet, retweetTweet, Tweet as Itweet } from "../api/tweets";
import Tweets from "../components/Tweets";
import { useAuth, ContextInterface } from "../contexts/authContext";

const Home = () => {
  const { user } = useAuth() as ContextInterface;
  const [tweets, setTweets] = useState<Itweet[]>([])

  const like = async (tweet_id: string) => {
    if (!user) return;

    const like = await likeTweet(user, tweet_id);
    const filteredTweets = tweets.filter((tweet) => tweet.id !== like.tweet.id);
    setTweets([like, ...filteredTweets]);
  };

  const retweet = async (tweet_id: string) => {
    if (!user) return;

    const retweet = await retweetTweet(user, tweet_id)
    const filteredTweets = tweets.filter((tweet) => tweet.id !== retweet.tweet.id);
    setTweets([retweet, ...filteredTweets]);
  };

  useEffect(() => {
    getFeed({ user })
      .then((data) => setTweets(data.list));
  }, []);

  return (
    <main>
      <Tweets tweets={tweets} like={like} retweet={retweet} />
    </main>
  );
};

export default Home;
