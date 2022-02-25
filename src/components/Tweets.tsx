import { TweetsResponse } from "../api/tweets";
import { QueryKey, UseInfiniteQueryResult } from "react-query";
import InfiniteScroll from 'react-infinite-scroller';

import Tweet from "./SmallTweet";
import Loader from "./Loader";
import ErrorPage from "./Error";
import { concatInfiniteQueryData } from "../helpers";

import { useLikeTweet, useRetweetTweet, useDeleteTweet, useBookmarkTweet } from "../hooks";
import NoTweets from "./NoTweets";

interface Props {
  tweetsValues: UseInfiniteQueryResult<TweetsResponse>;
  queryKey: QueryKey;
}
const Tweets = (props: Props) => {
  const { tweetsValues, queryKey } = props;
  const { data, isLoading, isError } = tweetsValues;

  const { toggleLike } = useLikeTweet(queryKey);
  const { toggleRetweet } = useRetweetTweet(queryKey);
  const { toggleBookmark } = useBookmarkTweet(queryKey);
  const deleteTweet = useDeleteTweet(queryKey);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!data) return <Loader />;

  const tweets = concatInfiniteQueryData(data);
  return (
    <div className="grow">
      {tweets.length < 1 ? (
        <NoTweets />
      ) : (
        <InfiniteScroll
        pageStart={1}
        loadMore={() => tweetsValues.fetchNextPage()}
        hasMore={tweetsValues.hasNextPage}
        loader={<Loader key='loader' />}
    >
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.data_id}
            tweet={tweet}
            deleteTweet={deleteTweet}
            toggleLike={toggleLike}
            toggleRetweet={toggleRetweet}
            toggleBookmark={toggleBookmark}
          />
        ))}
    </InfiniteScroll>
      )}
    </div>
  );
};

export default Tweets;
