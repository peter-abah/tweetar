import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getLikes } from "../api/tweetActions";

import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";

import Users from "../components/Users";

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
    <div className="w-full border-x border-neutral-300">
      <header className="p-2 border-b border-neutral-300">
        <h1 className="pl-4 text-lg">Likes</h1>
      </header>
      <Users />
    </div>
  );
};

export default Likes;
