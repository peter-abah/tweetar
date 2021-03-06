import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useInfiniteQuery } from "react-query";

import { UsersResponse } from "../api/users";
import { getTweetLikes } from "../api/tweetActions";

import { transformData } from "../helpers";

import Users from "../components/Users";
import Header from "../components/Header";

const Likes = () => {
  const { tweetId } = useParams() as { tweetId: string };
  const { currentUser } = useAuth();
  const queryKey = ["tweets", "likes", tweetId, currentUser];

  const usersValues = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const likes = await getTweetLikes(currentUser, tweetId, {
        page: pageParam,
      });
      return transformData(likes, ["user"]) as UsersResponse;
    },
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
    }
  );

  return (
    <>
      <Header title="Likes" backLink />
      <Users usersValues={usersValues} queryKey={queryKey} />
    </>
  );
};

export default Likes;
