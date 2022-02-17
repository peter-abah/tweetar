import React, { useContext, useEffect, useState } from "react";
import { User, followUser, unFollowUser } from "../api/users";
import { AuthContextInterface, useAuth } from "./authContext";

export interface UsersContextInterface {
  user: User | null;
  setUser: (user: User) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  onFollow: (user: User) => void;
  onUnfollow: (user: User) => void;
}

const UsersContext = React.createContext<UsersContextInterface | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const UsersProvider = ({ children }: ProviderProps) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;

  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const findUserIndex = (user: User) => {
    return users.findIndex((e) => e.id === user.id);
  };

  const updateUsers = (updatedUser: User) => {
    if (updatedUser.id === user?.id) {
      setUser(updatedUser);
      return;
    }

    const index = findUserIndex(updatedUser);
    if (index < 0) return;

    const filteredUsers = users.filter((e) => e.id !== updatedUser.id);
    filteredUsers.splice(index, 0, updatedUser);
    setUsers(filteredUsers);
  };

  const onFollow = async (user: User) => {
    if (!currentUser) return;

    const updatedUser = await followUser(currentUser, user);
    updateUsers(updatedUser);
  };

  const onUnfollow = async (user: User) => {
    if (!currentUser) return;

    const updatedUser = await unFollowUser(currentUser, user);
    updateUsers(updatedUser);
  };

  const providerValue = {
    user,
    users,
    setUser,
    setUsers,
    onFollow,
    onUnfollow,
  };

  return (
    <UsersContext.Provider value={providerValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const values = useContext(UsersContext);

  //useEffect(() => values?.setUsers([]), []);

  return values;
};
