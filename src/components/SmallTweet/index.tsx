import { deleteTweet, Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "..//TweetInfo";
import TweetBody from "./TweetBody";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
  deleteTweet: (tweet: Itweet) => void;
}

const Tweet = ({ tweet, toggleLike, toggleRetweet, deleteTweet }: Props) => {
  return (
    <div className="px-4 py-2 w-full border-b border-neutral">
      <TweetInfo {...tweet} />
      <TweetBody
        tweet={tweet}
        toggleLike={() => toggleLike(tweet)}
        toggleRetweet={() => toggleRetweet(tweet)}
        deleteTweet={() => deleteTweet(tweet)}
      />
    </div>
  );
};

export default Tweet;
