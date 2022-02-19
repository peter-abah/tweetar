import { Outlet, Routes, Route, Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";

import { AuthContextInterface, useAuth } from "../contexts/authContext";

import { useFollowUser, useLikeTweet, useRetweetTweet } from "../hooks";
import { getUsers, User } from "../api/users";
import { getTweets, Tweet } from "../api/tweets";
import { concatInfiniteQueryData } from "../helpers";

import Users from "../components/Users";
import Tweets from "../components/Tweets";

const SearchResults = ({ query }: { query: string }) => {
  const { currentUser } = useAuth() as AuthContextInterface;

  const tweetsQueryKey = ["tweets", "search", query, currentUser];
  const usersQueryKey = ["users", "search", query, currentUser];

  const tweetValues = useInfiniteQuery(
    tweetsQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, { q: query, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
      enabled: !!query,
    }
  );

  const usersValues = useInfiniteQuery(
    usersQueryKey,
    ({ pageParam = 1 }) => getUsers(currentUser, { q: query, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
      enabled: !!query,
    }
  );

  const { toggleLike } = useLikeTweet(tweetsQueryKey);
  const { toggleRetweet } = useRetweetTweet(usersQueryKey);

  const { follow, unfollow } = useFollowUser(usersQueryKey);
  
  if (!query) return null;

  if (!usersValues.data || !tweetValues.data)
    return <p>Remove this add a loading component</p>;

  const tweets = concatInfiniteQueryData<Tweet>(tweetValues.data);
  const users = concatInfiniteQueryData<User>(usersValues.data);

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
            <Tweets
              tweets={tweets}
              toggleLike={toggleLike}
              toggleRetweet={toggleRetweet}
            />
          }
        />
        <Route
          path="tweets"
          element={
            <Tweets
              tweets={tweets}
              toggleLike={toggleLike}
              toggleRetweet={toggleRetweet}
            />
          }
        />
        <Route
          path="users"
          element={
            <Users users={users} onFollow={follow} onUnfollow={unfollow} />
          }
        />
      </Routes>
    </>
  );
};

export default SearchResults;
