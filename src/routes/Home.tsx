import { useInfiniteQuery } from "react-query";
import { getFeed } from "../api/tweets";

import { useAuth } from "../contexts/authContext";

import Tweets from "../components/Tweets";
import Header from "../components/Header";

const Home = () => {
  const { currentUser } = useAuth();

  const queryKey = ["tweets", "feed", currentUser];
  const tweetsValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFeed(currentUser, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.next_page }
  );

  return (
    <>
      <Header title="Home" />
      <Tweets tweetsValues={tweetsValues} queryKey={queryKey} />
    </>
  );
};

export default Home;
