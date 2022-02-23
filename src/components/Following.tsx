import { useInfiniteQuery } from "react-query";
import { User, getFollowing } from "../api/users";
import { useAuth } from "../contexts/authContext";
import Users from "./Users";

const Following = ({ user }: { user: User }) => {
  const { currentUser } = useAuth();
  const queryKey = ["users", "following", user, currentUser];

  const usersValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFollowing(currentUser, user, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.next_page }
  );

  return <Users usersValues={usersValues} queryKey={queryKey} />;
};

export default Following;
