import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

import { createTweet, getTweet, getTweetReplies } from "../api/tweets";

import Tweets from "../components/Tweets";
import BigTweet from "../components/BigTweet";
import ReplyForm from "../components/ReplyForm";

const Tweet = () => {
  const { tweet, tweets, setTweet, setTweets, toggleRetweet, toggleLike } =
    useTweets() as TweetsContextInterface;
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { tweetId } = useParams() as { tweetId: string };

  useEffect(() => {
    getTweet(currentUser, tweetId).then((tweet) => setTweet(tweet));
  }, [currentUser, tweetId]);

  useEffect(() => {
    getTweetReplies(currentUser, tweetId).then((tweets) =>
      setTweets(tweets.list)
    );
  }, [currentUser, tweetId]);

  if (!tweet) return <p>Not Found</p>;

  const onSubmit = (
    { body }: { body: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!currentUser) return;

    createTweet(currentUser, {
      tweet: { body, parent_id: tweet.id },
    })
      .then((tweet) => setTweets([tweet, ...tweets]))
      .then(() => resetForm());
  };

  return (
    <main className="w-full max-w-xl mx-auto border-x border-neutral-300">
      <BigTweet
        tweet={tweet}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
      <ReplyForm tweetToReply={tweet} onSubmit={onSubmit} />
      <Tweets />
    </main>
  );
};

export default Tweet;
