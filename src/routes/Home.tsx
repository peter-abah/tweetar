import { useInfiniteQuery } from "react-query";
import { getFeed, Tweet } from "../api/tweets";
import { useLikeTweet, useRetweetTweet } from "../hooks";

import { useAuth } from "../contexts/authContext";

import Tweets from "../components/Tweets";
import Header from "../components/Header";

const Home = () => {
  const { currentUser } = useAuth();

  const queryKey = ["tweets", "feed", currentUser];
  const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFeed(currentUser, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.current_page + 1 }
  );

  const { toggleLike } = useLikeTweet(queryKey);
  const { toggleRetweet } = useRetweetTweet(queryKey);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;
  if (!data) return <p>Data is undefined: {data}</p>;

  const tweets = data.pages.reduce(
    (total: Tweet[], group) => total.concat(group.list),
    []
  );

  return (
    <>
      <Header title="Home" />
      <Tweets
        tweets={tweets}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
      <button onClick={() => fetchNextPage()}>Fetch more</button>
    </>
  );
};

export default Home;
