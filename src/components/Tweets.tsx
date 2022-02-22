import { Tweet as Itweet, TweetsResponse } from "../api/tweets";
import { UseInfiniteQueryResult } from "react-query";

import Tweet from "./SmallTweet";
import Loader from "./Loader";
import ErrorPage from "./Error";
import { concatInfiniteQueryData } from "../helpers";

interface Props {
  toggleLike: (tweet: Itweet) => void;
  toggleRetweet: (tweet: Itweet) => void;
  deleteTweet: (tweet: Itweet) => void;
  tweetsValues: UseInfiniteQueryResult<TweetsResponse>;
}
const Tweets = (props: Props) => {
  const { toggleLike, toggleRetweet, deleteTweet, tweetsValues } = props;
  const { data, isLoading, isError } = tweetsValues;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!data) return <Loader />;

  const tweets = concatInfiniteQueryData(data);

  return (
    <div className="grow">
      {tweets.map((tweet) => (
        <Tweet
          key={`${tweet.id}${tweet.type}`}
          tweet={tweet}
          deleteTweet={deleteTweet}
          toggleLike={toggleLike}
          toggleRetweet={toggleRetweet}
        />
      ))}
    </div>
  );
};

export default Tweets;
