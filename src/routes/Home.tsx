import { useInfiniteQuery } from "react-query";
import { getFeed } from "../api/tweets";
import { useLikeTweet, useRetweetTweet, useDeleteTweet } from "../hooks";

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

  const { toggleLike } = useLikeTweet(queryKey);
  const { toggleRetweet } = useRetweetTweet(queryKey);
  const deleteTweet = useDeleteTweet(queryKey)

  return (
    <>
      <Header title="Home" />
      <Tweets
        tweetsValues={tweetsValues}
        toggleLike={toggleLike}
        toggleRetweet={toggleRetweet}
        deleteTweet={deleteTweet}
      />
    </>
  );
};

export default Home;
