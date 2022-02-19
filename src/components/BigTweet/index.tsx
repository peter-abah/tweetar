import { UseQueryResult } from "react-query";

import { Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "../TweetInfo";
import TweetBody from "./TweetBody";
import TweetUser from "./TweetUser";
import TweetStats from "./TweetStats";
import TweetBtns from "./TweetBtns";
import Loader from "../Loader";
import ErrorPage from "../Error";

interface Props {
  tweetValues: UseQueryResult<Itweet>;
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
}

const Tweet = ({ tweetValues, toggleLike, toggleRetweet }: Props) => {
  const { data: tweet, isLoading, isError } = tweetValues;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!tweet) return <Loader />;

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
