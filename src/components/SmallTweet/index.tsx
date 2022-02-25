import { deleteTweet, Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "..//TweetInfo";
import TweetBody from "./TweetBody";

interface Props {
  tweet: Itweet;
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
  deleteTweet: (tweet: Itweet) => void;
  toggleBookmark: (tweet: Itweet) => void;
}

const Tweet = (props: Props) => {
  const { tweet, toggleLike, toggleRetweet, deleteTweet, toggleBookmark } =
    props;
  return (
    <div className="px-4 py-2 w-full border-b border-neutral">
      <TweetInfo {...tweet} />
      <TweetBody
        tweet={tweet}
        toggleLike={() => toggleLike(tweet)}
        toggleRetweet={() => toggleRetweet(tweet)}
        deleteTweet={() => deleteTweet(tweet)}
        toggleBookmark={() => toggleBookmark(tweet)}
      />
    </div>
  );
};

export default Tweet;
