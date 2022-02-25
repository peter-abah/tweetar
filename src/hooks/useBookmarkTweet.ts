import {
  useQueryClient,
  useMutation,
  QueryKey,
  InfiniteData,
} from "react-query";
import { useAuth } from "../contexts/authContext";
import { Tweet, TweetsResponse } from "../api/tweets";
import { bookmarkTweet, deleteTweetBookmark } from "../api/bookmarks";
import { getUpdatedData } from "../helpers";

const useBookmarkTweet = (queryKey: QueryKey) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const getUpdatedTweet = (
    tweet: Tweet,
    { bookmarked_by_user }: { bookmarked_by_user: boolean }
  ) => {
    return {
      ...tweet,
      tweet: { ...tweet.tweet, bookmarked_by_user },
    };
  };

  const { mutate: bookmark } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return bookmarkTweet(currentUser, data.tweet.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, { bookmarked_by_user: true });

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

  const { mutate: deleteBookmark } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return deleteTweetBookmark(currentUser, data.tweet.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);
        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);
        const updatedTweet = getUpdatedTweet(tweet, { bookmarked_by_user: false });

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

  const toggleBookmark = (tweet: Tweet) => {
    if (!currentUser) return;
    return tweet.tweet.bookmarked_by_user ? deleteBookmark(tweet) : bookmark(tweet);
  };

  return { bookmark, deleteBookmark, toggleBookmark };
};

export default useBookmarkTweet;
