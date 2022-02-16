import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

import { getTweet, getTweetReplies } from "../api/tweets";

import Tweets from "../components/Tweets";
import BigTweet from "../components/BigTweet";

const Tweet = () => {
  const { tweet, setTweet, setTweets, toggleRetweet, toggleLike } =
    useTweets() as TweetsContextInterface;
  const { user } = useAuth() as AuthContextInterface;
  const { tweetId } = useParams() as { tweetId: string };

  useEffect(() => {
    getTweet(user, tweetId).then((tweet) => setTweet(tweet));
  }, [user, tweetId]);

  useEffect(() => {
    getTweetReplies(user, tweetId).then((tweets) => setTweets(tweets.list));
  }, [user, tweetId])

  if (!tweet) return <p>Not Found</p>;

  return (
    <div className="w-full max-w-xl mx-auto">
      <BigTweet
        tweet={tweet}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
      <Tweets />
    </div>
  );
};

export default Tweet;
