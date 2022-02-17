import { Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "..//TweetInfo";
import TweetBody from "./TweetBody";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const Tweet = ({ tweet, toggleLike, toggleRetweet }: Props) => {
  return (
    <div className="mx-auto p-2 w-full border-b border-neutral-300">
      <TweetInfo {...tweet} />
      <TweetBody
        tweet={tweet}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
    </div>
  );
};

export default Tweet;
