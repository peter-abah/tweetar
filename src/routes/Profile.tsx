import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { User, getUser, followUser, unFollowUser } from "../api/users";
import { getTweetsForUser } from "../api/tweets";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { TweetsContextInterface, useTweets } from "../contexts/tweetsContext";

import ProfileInfo from "../components/ProfileInfo";
import Tweets from "../components/Tweets";

const Profile = () => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { username } = useParams() as { username: string };
  const [user, setUser] = useState<User | null>(null);
  const { setTweets } = useTweets() as TweetsContextInterface;

  useEffect(() => {
    getUser(username, currentUser).then((user) => setUser(user));
  }, [username, currentUser]);

  useEffect(() => {
    if (!user) return;

    getTweetsForUser(currentUser, user).then((data) => setTweets(data.list));
  }, [user]);

  const onFollow = () => {
    if (!user || !currentUser) return;

    followUser(currentUser, user).then((user) =>
      setUser(user)
    );
  };

  const onUnfollow = () => {
    if (!user || !currentUser) return;

    unFollowUser(currentUser, user).then((user) =>
      setUser(user)
    );
  };

  if (!user) return <p>Loading ...</p>;

  return (
    <main className="border-x border-neutral-300">
      <ProfileInfo user={user} onFollow={onFollow} onUnfollow={onUnfollow} />
      <Tweets />
    </main>
  );
};

export default Profile;
