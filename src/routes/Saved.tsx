import { useInfiniteQuery } from "react-query";
import { getBookmarks } from "../api/bookmarks";

import { useAuth } from "../contexts/authContext";

import Tweets from "../components/Tweets";
import Header from "../components/Header";

const Saved = () => {
  const { currentUser } = useAuth();

  const fetchBookmarks = ({ pageParam = 1 }) => {
    if (!currentUser) throw new Error("You have to be logged in");

    return getBookmarks(currentUser, { page: pageParam });
  };

  const queryKey = ["tweets", "bookmarks", currentUser];
  const tweetsValues = useInfiniteQuery(queryKey, fetchBookmarks, {
    getNextPageParam: (lastPage) => lastPage.next_page,
  });

  return (
    <>
      <Header title="Saved" backLink />
      <Tweets tweetsValues={tweetsValues} queryKey={queryKey} />
    </>
  );
};

export default Saved;
