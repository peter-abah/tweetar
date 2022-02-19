import Tweet from "./SmallTweet";
import { Tweet as Itweet } from "../api/tweets";

const Tweets = ({
  tweets,
  toggleLike,
  toggleRetweet,
}: {
  tweets: Itweet[];
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
}) => {
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
