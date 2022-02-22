import { useQuery, useInfiniteQuery } from "react-query";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

import { getUser } from "../api/users";
import { getTweets } from "../api/tweets";

import { useAuth } from "../contexts/authContext";
import {
  useFollowUser,
  useLikeTweet,
  useRetweetTweet,
  useDeleteTweet,
} from "../hooks";

import ProfileInfo from "../components/ProfileInfo";
import Tweets from "../components/Tweets";
import ProfileUsers from "../components/ProfileUsers";
import Header from "../components/Header";
import ProfileNav from "../components/ProfileNav";
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
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
      enabled: !!user,
    }
  );

  const likesValues = useInfiniteQuery(
    likesQueryKey,
    ({ pageParam = 1 }) =>
      getUserLikes(currentUser, user?.id as string, { page: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
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
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
      enabled: !!user,
    }
  );

  const { follow, unfollow } = useFollowUser(userQueryKey);

  const { toggleLike: toggleTweetsLike } = useLikeTweet(tweetsQueryKey);
  const { toggleRetweet: toggleTweetsRetweet } =
    useRetweetTweet(tweetsQueryKey);

  const { toggleLike: toggleLikesLike } = useLikeTweet(likesQueryKey);
  const { toggleRetweet: toggleLikesRetweet } = useRetweetTweet(likesQueryKey);

  const { toggleLike: toggleMediaLike } = useLikeTweet(mediaQueryKey);
  const { toggleRetweet: toggleMediaRetweet } = useRetweetTweet(mediaQueryKey);

  const deleteTweetsTweet = useDeleteTweet(tweetsQueryKey);
  const deleteLikesTweet = useDeleteTweet(likesQueryKey);
  const deleteMediaTweet = useDeleteTweet(mediaQueryKey);

  // const { data: user } = userValues;
  return (
    <>
      <Header title={userValues.data?.name} backLink />
      <ProfileInfo
        userValues={userValues}
        onFollow={follow}
        onUnfollow={unfollow}
      />
      <ProfileNav />
      <Outlet />

      <Routes>
        <Route
          index
          element={
            <Tweets
              tweetsValues={tweetsValues}
              toggleLike={toggleTweetsLike}
              toggleRetweet={toggleTweetsRetweet}
              deleteTweet={deleteTweetsTweet}
            />
          }
        />
        <Route
          path="tweets"
          element={
            <Tweets
              tweetsValues={tweetsValues}
              toggleLike={toggleTweetsLike}
              toggleRetweet={toggleTweetsRetweet}
              deleteTweet={deleteTweetsTweet}
            />
          }
        />

        <Route
          path="likes"
          element={
            <Tweets
              tweetsValues={likesValues}
              toggleLike={toggleLikesLike}
              toggleRetweet={toggleLikesRetweet}
              deleteTweet={deleteLikesTweet}
            />
          }
        />

        <Route
          path="media"
          element={
            <Tweets
              tweetsValues={mediaValues}
              toggleLike={toggleMediaLike}
              toggleRetweet={toggleMediaRetweet}
              deleteTweet={deleteMediaTweet}
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
