import { Outlet, Routes, Route } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { AuthContextInterface, useAuth } from "../contexts/authContext";

import { getUsers } from "../api/users";
import { getTweets } from "../api/tweets";


import Users from "../components/Users";
import Tweets from "../components/Tweets";
import HorizNav from "./HorizNav";

const SearchResults = ({ query }: { query: string }) => {
  const { currentUser } = useAuth() as AuthContextInterface;

  const tweetsQueryKey = ["tweets", "search", query, currentUser];
  const usersQueryKey = ["users", "search", query, currentUser];

  const tweetsValues = useInfiniteQuery(
    tweetsQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, { q: query, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!query,
    }
  );

  const usersValues = useInfiniteQuery(
    usersQueryKey,
    ({ pageParam = 1 }) => getUsers(currentUser, { q: query, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!query,
    }
  );

  if (!query) return null;

  const links = [
    { title: "People", link: "users" },
    { title: "Tweets", link: "tweets" },
  ];

  return (
    <>
      <HorizNav links={links} />
      <Outlet />

      <Routes>
        <Route
          index
          element={
            <Tweets tweetsValues={tweetsValues} queryKey={tweetsQueryKey} />
          }
        />
        <Route
          path="tweets"
          element={
            <Tweets tweetsValues={tweetsValues} queryKey={tweetsQueryKey} />
          }
        />
        <Route
          path="users"
          element={<Users usersValues={usersValues} queryKey={usersQueryKey} />}
        />
      </Routes>
    </>
  );
};

export default SearchResults;
