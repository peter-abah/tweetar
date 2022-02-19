import { useInfiniteQuery } from "react-query";
import { User, getFollowers } from "../api/users";
import { useAuth } from "../contexts/authContext";
import { useFollowUser } from "../hooks";
import { concatInfiniteQueryData } from "../helpers";
import Users from "./Users";

const Followers = ({ user }: { user: User }) => {
  const { currentUser } = useAuth();
  const queryKey = ["users", "followers", user, currentUser];

  const userValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFollowers(currentUser, user, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.current_page + 1 }
  );

  const { follow, unfollow } = useFollowUser(queryKey);

  if (!userValues.data)
    return <p>Remove this component, loading or error state</p>;

  const users = concatInfiniteQueryData(userValues.data);
  return <Users users={users} onFollow={follow} onUnfollow={unfollow} />;
};

export default Followers;
