import { useInfiniteQuery } from "react-query";
import { getFeed, Tweet } from "../api/tweets";
import { useLikeTweet, useRetweetTweet } from "../hooks";

import { useAuth } from "../contexts/authContext";

import Tweets from "../components/Tweets";
import Header from "../components/Header";

const Home = () => {
  const { currentUser } = useAuth();

  const queryKey = ["tweets", "feed", currentUser];
  const tweetsValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFeed(currentUser, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.current_page + 1 }
  );

  const { data, isLoading, isError, error, fetchNextPage } = tweetsValues;
  const { toggleLike } = useLikeTweet(queryKey);
  const { toggleRetweet } = useRetweetTweet(queryKey);

  // const tweets = data.pages.reduce(
  //   (total: Tweet[], group) => total.concat(group.list),
  //   []
  // );

  return (
    <>
      <Header title="Home" />
      <Tweets
        tweetsValues={tweetsValues}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
      />
    </>
  );
};

export default Home;
