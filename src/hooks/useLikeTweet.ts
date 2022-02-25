import {
  useQueryClient,
  useMutation,
  QueryKey,
  InfiniteData,
} from "react-query";
import { useAuth } from "../contexts/authContext";
import { Tweet, TweetsResponse } from "../api/tweets";
import { likeTweet, deleteTweetLike } from "../api/tweetActions";
import { getUpdatedData } from "../helpers";

const useLikeTweet = (queryKey: QueryKey) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const getUpdatedTweet = (
    tweet: Tweet,
    { liked_by_user }: { liked_by_user: boolean }
  ) => {
    const likes_count = liked_by_user
      ? tweet.tweet.likes_count + 1
      : tweet.tweet.likes_count - 1;
    return {
      ...tweet,
      tweet: { ...tweet.tweet, liked_by_user, likes_count },
    };
  };

  const { mutate: like } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return likeTweet(currentUser, data.tweet.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, { liked_by_user: true });

        if (!prevData) return { prevData };

        if ("pages" in prevData) {
          // check if it is an instance of InfiniteData
          queryClient.setQueryData<InfiniteData<TweetsResponse>>(
            queryKey,
            getUpdatedData(prevData, updatedTweet)
          );
        }

        if ("tweet" in prevData) {
          //checks if it is an instance of Tweet
          queryClient.setQueryData<Tweet>(queryKey, updatedTweet);
        }

        return { prevData };
      },

      onError: (err, _data, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
        throw err;
      },

      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const { mutate: deleteLike } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return deleteTweetLike(currentUser, data.tweet.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, { liked_by_user: false });

        if (!prevData) return { prevData };

        if ("pages" in prevData) {
          // check if it is an instance of InfiniteData
          queryClient.setQueryData<InfiniteData<TweetsResponse>>(
            queryKey,
            getUpdatedData(prevData, updatedTweet)
          );
        }

        if ("tweet" in prevData) {
          //checks if it is an instance of Tweet
          queryClient.setQueryData<Tweet>(queryKey, updatedTweet);
        }

        return { prevData };
      },

      onError: (err, _data, context) => {
        if (context?.prevData) {
          queryClient.setQueryData(queryKey, context.prevData);
        }
        throw err;
      },

      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const toggleLike = (tweet: Tweet) => {
    if (!currentUser) return;
    return tweet.tweet.liked_by_user ? deleteLike(tweet) : like(tweet);
  };

  return { like, deleteLike, toggleLike };
};

export default useLikeTweet;
