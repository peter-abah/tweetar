import { Tweet as Itweet, TweetAction } from "../api/tweets";
import TweetInfo from "./TweetInfo";
import TweetBody from "./TweetBody";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const Tweet = ({ tweet, toggleLike, toggleRetweet }: Props) => {
  return (
    <div className="p-2 w-full max-w-sm border-t border-neutral-600 last:border-b">
      {['like', 'retweet'].includes(tweet.type) && <TweetInfo {...tweet} />}
      <TweetBody
        tweet={tweet}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
    </div>
  );
};

export default Tweet;
