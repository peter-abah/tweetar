import { Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "..//TweetInfo";
import TweetBody from "./TweetBody";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
}

const Tweet = ({ tweet, toggleLike, toggleRetweet }: Props) => {
  return (
    <div className="mx-auto p-2 w-full border-b border-neutral">
      <TweetInfo {...tweet} />
      <TweetBody
        tweet={tweet}
        toggleLike={() => toggleLike(tweet)}
        toggleRetweet={() => toggleRetweet(tweet)}
      />
    </div>
  );
};

export default Tweet;
