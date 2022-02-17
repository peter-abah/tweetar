import { useEffect } from "react";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

import { getUser } from "../api/users";
import { getTweetsForUser } from "../api/tweets";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

import ProfileInfo from "../components/ProfileInfo";
import Tweets from "../components/Tweets";
import ProfileUsers from "../components/ProfileUsers";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

const Profile = () => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { user, setUser } = useUsers() as UsersContextInterface;

  const { username } = useParams() as { username: string };
  const { setTweets } = useTweets() as TweetsContextInterface;

  useEffect(() => {
    getUser(username, currentUser).then((user) => setUser(user));
  }, [username, currentUser]);

  useEffect(() => {
    if (!user) return;

    getTweetsForUser(currentUser, user).then((data) => setTweets(data.list));
  }, [user]);

  if (!user) return <p>Loading ...</p>;

  return (
    <main className="">
      <ProfileInfo user={user} />
      <Outlet />

      <Routes>
        <Route index element={<Tweets />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="users/*" element={<ProfileUsers user={user} />} />
      </Routes>
    </main>
  );
};

export default Profile;
