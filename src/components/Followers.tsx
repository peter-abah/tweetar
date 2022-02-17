import { useEffect } from "react";
import { User, getFollowers } from "../api/users";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { UsersContextInterface, useUsers } from "../contexts/usersContext";
import Users from "./Users";

const Followers = ({ user }: { user: User }) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;
  const { setUsers } = useUsers() as UsersContextInterface;

  useEffect(() => {
    getFollowers(currentUser, user).then((users) => setUsers(users.list));
  }, [user, currentUser]);

  return <Users />;
};

export default Followers;
