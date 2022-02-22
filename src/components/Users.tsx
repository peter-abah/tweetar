import { QueryKey, UseInfiniteQueryResult } from "react-query";
import { UsersResponse, User as Iuser } from "../api/users";
import { concatInfiniteQueryData } from "../helpers";
import { useFollowUser } from "../hooks";
import ErrorPage from "./Error";

import Loader from "./Loader";
import User from "./User";
import NoUsers from "./NoUsers";

interface Props {
  usersValues: UseInfiniteQueryResult<UsersResponse>;
  queryKey: QueryKey;
}

const Users = ({ usersValues, queryKey }: Props) => {
  const { data, isLoading, isError } = usersValues;
  const { follow, unfollow } = useFollowUser(queryKey);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;
  if (!data) return <Loader />;

  const users = concatInfiniteQueryData(data);

  return (
    <div className="border-neutral grow">
      {users.length < 1 ? (
        <NoUsers />
      ) : (
        users.map((user) => (
          <User
            key={user.id}
            user={user}
            onFollow={follow}
            onUnfollow={unfollow}
          />
        ))
      )}
    </div>
  );
};

export default Users;
