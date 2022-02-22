import { QueryKey, UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";

import { Tweet as Itweet } from "../../api/tweets";
import TweetInfo from "../TweetInfo";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";
import TweetStats from "./TweetStats";
import TweetBtns from "./TweetBtns";
import Loader from "../Loader";
import ErrorPage from "../Error";

import { useLikeTweet, useRetweetTweet, useDeleteTweet } from "../../hooks";

interface Props {
  tweetValues: UseQueryResult<Itweet>;
  queryKey: QueryKey;
}

const Tweet = ({ tweetValues, queryKey }: Props) => {
  const { data: tweet, isLoading, isError } = tweetValues;
  const navigate = useNavigate();

  const { toggleLike } = useLikeTweet(queryKey);
  const { toggleRetweet } = useRetweetTweet(queryKey);
  const deleteTweet = useDeleteTweet(queryKey);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!tweet) return <Loader />;

  const deleteAndNavigate = () => {
    deleteTweet(tweet);
    navigate(-1);
  };

  return (
    <div className="p-4 border-b border-neutral">
      <TweetInfo {...tweet} />
      <TweetHeader tweet={tweet} deleteTweet={deleteAndNavigate} />
      <TweetBody tweet={tweet} />
      <TweetStats tweet={tweet} />
      <TweetBtns
        tweet={tweet}
        toggleLike={() => toggleLike(tweet)}
        toggleRetweet={() => toggleRetweet(tweet)}
      />
    </div>
  );
};

export default Tweet;
