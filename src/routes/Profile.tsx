import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { User } from "../api/users";
import { getUser } from "../api/users";
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

  if (!user) return <p>Loading ...</p>;

  return (
    <main className="border-x border-neutral-300">
      <ProfileInfo user={user} />
      <Tweets />
    </main>
  );
};

export default Profile;
