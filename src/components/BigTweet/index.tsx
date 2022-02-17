import { Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "../TweetInfo";
import TweetBody from "./TweetBody";
import TweetUser from "./TweetUser";
import TweetStats from "./TweetStats";
import TweetBtns from "./TweetBtns";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const Tweet = ({ tweet, toggleLike, toggleRetweet }: Props) => {
  return (
    <div className="p-4 border-b border-neutral">
      <TweetInfo {...tweet} />
      <TweetUser tweet={tweet} />
      <TweetBody tweet={tweet} />
      <TweetStats tweet={tweet} />
      <TweetBtns
        tweet={tweet}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
    </div>
  );
};

export default Tweet;
