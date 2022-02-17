import { useEffect } from "react";
import { User, getFollowing } from "../api/users";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";
import Users from "./Users";

const Following = ({ user }: { user: User }) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { setUsers } = useUsers() as UsersContextInterface;

  useEffect(() => {
    getFollowing(currentUser, user).then((users) => setUsers(users.list));
  }, [currentUser, user]);

  return <Users />;
};

export default Following;
