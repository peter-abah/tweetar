import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getLikes } from "../api/tweetActions";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

import Users from "../components/Users";
import Header from "../components/Header";

const Likes = () => {
  const { tweetId } = useParams() as { tweetId: string };

  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { setUsers } = useUsers() as UsersContextInterface;

  useEffect(() => {
    getLikes(currentUser, tweetId).then((likes) => {
      const users = likes.list.map(({ user }: any) => user);
      setUsers(users);
    });
  }, [tweetId, currentUser]);

  return (
    <>
      <Header title="Likes" backLink />
      <Users />
    </>
  );
};

export default Likes;
