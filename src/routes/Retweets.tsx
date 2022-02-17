import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRetweets } from "../api/tweetActions";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

import Users from "../components/Users";
import Header from "../components/Header";

const Retweets = () => {
  const { tweetId } = useParams() as { tweetId: string };

  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { setUsers } = useUsers() as UsersContextInterface;

  useEffect(() => {
    getRetweets(currentUser, tweetId).then((retweets) => {
      const users = retweets.list.map(({ user }: any) => user);
      setUsers(users);
    });
  }, [tweetId, currentUser]);

  return (
    <>
      <Header title="Retweets" backLink />
      <Users />
    </>
  );
};

export default Retweets;
