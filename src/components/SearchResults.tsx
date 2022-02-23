import { Outlet, Routes, Route, Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { AuthContextInterface, useAuth } from "../contexts/authContext";

import { getUsers } from "../api/users";
import { getTweets } from "../api/tweets";

import Users from "../components/Users";
import Tweets from "../components/Tweets";

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

  return (
    <>
      <nav className="px-2 py-3 border-b border-neutral">
        <ul className="flex gap-4">
          <li>
            <Link className="block px-6 py-1" to="users">
              People
            </Link>
          </li>

          <li>
            <Link className="block px-6 py-1" to="tweets">
              Tweets
            </Link>
          </li>
        </ul>
      </nav>
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
