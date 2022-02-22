import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useInfiniteQuery } from "react-query";

import { UsersResponse } from "../api/users";
import { getTweetRetweets } from "../api/tweetActions";

import { transformData } from "../helpers";

import Users from "../components/Users";
import Header from "../components/Header";

const Retweets = () => {
  const { tweetId } = useParams() as { tweetId: string };
  const { currentUser } = useAuth();
  const queryKey = ["tweets", "retweets", tweetId, currentUser];

  const usersValues = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const retweets = await getTweetRetweets(currentUser, tweetId, {
        page: pageParam,
      });
      return transformData(retweets, ["user"]) as UsersResponse;
    },
    {
      getNextPageParam: (lastPage) => lastPage.current_page + 1,
    }
  );

  return (
    <>
      <Header title="Retweets" backLink />
      <Users usersValues={usersValues} queryKey={queryKey} />
    </>
  );
};

export default Retweets;
