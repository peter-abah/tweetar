import Tweet from "./SmallTweet";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

const Tweets = () => {
  const { tweets, toggleLike, toggleRetweet } =
    useTweets() as TweetsContextInterface;

  return (
    <div className="h-full">
      {tweets.map((tweet) => (
        <Tweet
          key={`${tweet.id}${tweet.type}`}
          tweet={tweet}
          toggleLike={toggleLike}
          toggleRetweet={toggleRetweet}
        />
      ))}
    </div>
  );
};

export default Tweets;
