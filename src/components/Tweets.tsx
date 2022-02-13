import Tweet from "./Tweet";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

const Tweets = () => {
  const { tweets, toggleLike, toggleRetweet } =
    useTweets() as TweetsContextInterface;

  return (
    <>
      {tweets.map((tweet) => (
        <Tweet
          key={`${tweet.id}${tweet.type}`}
          tweet={tweet}
          toggleLike={toggleLike}
          toggleRetweet={toggleRetweet}
        />
      ))}
    </>
  );
};

export default Tweets;
