import { useQuery, useInfiniteQuery } from "react-query";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

import { getUser } from "../api/users";
import { getTweets } from "../api/tweets";

import { useAuth } from "../contexts/authContext";

import ProfileInfo from "../components/ProfileInfo";
import Tweets from "../components/Tweets";
import ProfileUsers from "../components/ProfileUsers";
import Header from "../components/Header";
import { useFollowUser, useLikeTweet, useRetweetTweet } from "../hooks";
import { concatInfiniteQueryData } from "../helpers";

const Profile = () => {
  const { currentUser } = useAuth();
  const { username } = useParams() as { username: string };

  const userQueryKey = ["users", "profile", username, currentUser];
  const tweetsQueryKey = ["tweets", "user", username, currentUser];

  const userValues = useQuery(userQueryKey, () =>
    getUser(currentUser, username)
  );
  const user = userValues.data;

  const tweetsValues = useInfiniteQuery(
    tweetsQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, { user_id: user?.id, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
      enabled: !!user,
    }
  );

  const { follow, unfollow } = useFollowUser(userQueryKey);
  const { toggleLike } = useLikeTweet(tweetsQueryKey);
  const { toggleRetweet } = useRetweetTweet(tweetsQueryKey);
  
  // const { data: user } = userValues;
  return (
    <>
      <Header title={userValues.data?.name} backLink />
      <ProfileInfo
        userValues={userValues}
        onFollow={follow}
        onUnfollow={unfollow}
      />
      <Outlet />

      <Routes>
        <Route
          index
          element={
            <Tweets
              tweetsValues={tweetsValues}
              toggleLike={toggleLike}
              toggleRetweet={toggleRetweet}
            />
          }
        />
        <Route
          path="tweets"
          element={
            <Tweets
              tweetsValues={tweetsValues}
              toggleLike={toggleLike}
              toggleRetweet={toggleRetweet}
            />
          }
        />
        {userValues.data && (
          <Route
            path="users/*"
            element={<ProfileUsers user={userValues.data} />}
          />
        )}
      </Routes>
    </>
  );
};

export default Profile;
