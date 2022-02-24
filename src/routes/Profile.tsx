import { useQuery, useInfiniteQuery } from "react-query";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

import { getUser } from "../api/users";
import { getTweets } from "../api/tweets";

import { useAuth } from "../contexts/authContext";
import { useFollowUser } from "../hooks";

import ProfileInfo from "../components/ProfileInfo";
import Tweets from "../components/Tweets";
import Header from "../components/Header";
import HorizNav from "../components/HorizNav";
import { getUserLikes } from "../api/tweetActions";

const Profile = () => {
  const { currentUser } = useAuth();
  const { username } = useParams() as { username: string };

  const userQueryKey = ["users", "profile", username, currentUser];
  const tweetsQueryKey = ["tweets", "user", username, currentUser];
  const likesQueryKey = ["tweets", "user", "likes", username, currentUser];
  const mediaQueryKey = ["tweets", "user", "media", username, currentUser];

  const userValues = useQuery(userQueryKey, () =>
    getUser(currentUser, username)
  );
  const user = userValues.data;

  const tweetsValues = useInfiniteQuery(
    tweetsQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, { user_id: user?.id, page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!user,
    }
  );

  const likesValues = useInfiniteQuery(
    likesQueryKey,
    ({ pageParam = 1 }) =>
      getUserLikes(currentUser, user?.id as string, { page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!user,
    }
  );

  const mediaValues = useInfiniteQuery(
    mediaQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, {
        user_id: user?.id,
        images: "attached",
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!user,
    }
  );

  const { follow, unfollow } = useFollowUser(userQueryKey);
  const navLinks = [
    { title: "Tweets", link: "tweets" },
    { title: "Likes", link: "likes" },
    { title: "Media", link: "media" },
  ];
  return (
    <>
      <Header title={userValues.data?.name} backLink />
      <ProfileInfo
        userValues={userValues}
        onFollow={follow}
        onUnfollow={unfollow}
      />
      <HorizNav links={navLinks} />
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
          path="likes"
          element={
            <Tweets tweetsValues={likesValues} queryKey={likesQueryKey} />
          }
        />

        <Route
          path="media"
          element={
            <Tweets tweetsValues={mediaValues} queryKey={mediaQueryKey} />
          }
        />
      </Routes>
    </>
  );
};

export default Profile;
