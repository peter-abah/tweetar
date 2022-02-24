import { useInfiniteQuery } from "react-query";
import { getRecommendedFollows } from "../api/users";
import { useAuth } from "../contexts/authContext";

import Users from "../components/Users";
import Header from "../components/Header";

const Connect = () => {
  const { currentUser } = useAuth();
  const queryKey = ["users", "recommended_follows", currentUser];

  const userValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) =>
      getRecommendedFollows(currentUser, {
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
      enabled: !!currentUser,
    }
  );

  return (
    <>
      <Header title="Connect" backLink />
      <Users usersValues={userValues} queryKey={queryKey} />
    </>
  );
};

export default Connect;
