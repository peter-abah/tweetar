import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useInfiniteQuery } from "react-query";

import { useFollowUser } from "../hooks";
import { UsersResponse } from "../api/users";
import { getTweetRetweets } from "../api/tweetActions";

import { concatInfiniteQueryData, transformData } from "../helpers";

import Users from "../components/Users";
import Header from "../components/Header";

const Retweets = () => {
  const { tweetId } = useParams() as { tweetId: string };
  const { currentUser } = useAuth();
  const queryKey = ["tweets", "retweets", tweetId, currentUser];

  const retweetsValues = useInfiniteQuery(
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

  const { follow, unfollow } = useFollowUser(queryKey);

  if (!retweetsValues.data)
    return <p>Remove this component, loading or error state</p>;

  const users = concatInfiniteQueryData(retweetsValues.data);
  return (
    <>
      <Header title="Retweets" backLink />
      <Users users={users} onFollow={follow} onUnfollow={unfollow} />
    </>
  );
};

export default Retweets;
