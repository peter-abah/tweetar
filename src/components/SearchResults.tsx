import { Outlet, Routes, Route, Link } from "react-router-dom";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

import { getUsers } from "../api/users";
import { getTweets } from "../api/tweets";

import Users from "../components/Users";
import Tweets from "../components/Tweets";
import { useEffect } from "react";

const SearchResults = ({ query }: { query: string }) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { setTweets } = useTweets() as TweetsContextInterface;
  const { setUsers } = useUsers() as UsersContextInterface;

  useEffect(() => {
    if (!query) return;

    getTweets(currentUser, { q: query }).then((tweets) => {
      setTweets(tweets.list);
    });
  }, [query]);

  useEffect(() => {
    if (!query) return;

    getUsers(currentUser, { q: query }).then((users) => setUsers(users.list));
  }, [query]);

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
        <Route index element={<Tweets />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
};

export default SearchResults;
