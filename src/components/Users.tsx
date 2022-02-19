import { UseInfiniteQueryResult } from "react-query";
import { UsersResponse, User as Iuser } from "../api/users";
import { concatInfiniteQueryData } from "../helpers";
import ErrorPage from "./Error";

import Loader from "./Loader";
import User from "./User";

interface Props {
  usersValues: UseInfiniteQueryResult<UsersResponse>;
  onFollow: (user: Iuser) => void;
  onUnfollow: (user: Iuser) => void;
}

const Users = ({ usersValues, onFollow, onUnfollow }: Props) => {
  const { data, isLoading, isError } = usersValues;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!data) return <Loader />;

  const users = concatInfiniteQueryData(data);

  return (
    <div className="border-neutral grow">
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
      ))}
    </div>
  );
};

export default Users;
