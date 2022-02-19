import {
  useQueryClient,
  useMutation,
  QueryKey,
  InfiniteData,
} from "react-query";
import { useAuth } from "../contexts/authContext";
import { Tweet, TweetsResponse } from "../api/tweets";
import { retweetTweet, deleteTweetRetweet } from "../api/tweetActions";
import { getUpdatedData } from "../helpers";

const useRetweetTweet = (queryKey: QueryKey) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const getUpdatedTweet = (
    tweet: Tweet,
    { retweeted_by_user }: { retweeted_by_user: boolean }
  ) => {
    const retweets_count = retweeted_by_user
      ? tweet.tweet.retweets_count + 1
      : tweet.tweet.retweets_count - 1;
    return {
      ...tweet,
      tweet: { ...tweet.tweet, retweeted_by_user, retweets_count },
    };
  };

  const { mutate: retweet } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return retweetTweet(currentUser, data.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, {
          retweeted_by_user: true,
        });

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

  const { mutate: deleteRetweet } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return deleteTweetRetweet(currentUser, data.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, {
          retweeted_by_user: false,
        });

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

  const toggleRetweet = (tweet: Tweet) =>
    tweet.tweet.retweeted_by_user ? deleteRetweet(tweet) : retweet(tweet);

  return { retweet, deleteRetweet, toggleRetweet };
};

export default useRetweetTweet;
