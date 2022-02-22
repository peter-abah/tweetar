import {
  useQueryClient,
  useMutation,
  QueryKey,
  InfiniteData,
} from "react-query";
import { useAuth } from "../contexts/authContext";
import { deleteTweet, Tweet, TweetsResponse } from "../api/tweets";
import { findIndices } from "../helpers";

const useDeleteTweet = (queryKey: QueryKey) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const getUpdatedData = (
    dataList: InfiniteData<TweetsResponse>,
    data: Tweet
  ) => {
    const { pageIndex } = findIndices(dataList.pages, data);
    if (pageIndex < 0) return dataList;

    const list = dataList.pages[pageIndex].list.filter(
      (tweet) => tweet.data_id !== data.data_id
    );

    const page = { ...dataList.pages[pageIndex], list };
    const pages = [...dataList.pages];
    pages.splice(pageIndex, 1, page);

    return { ...dataList, pages };
  };

  const { mutate } = useMutation(
    (data: Tweet) => {
      if (!currentUser) throw new Error();
      return deleteTweet(currentUser, data.tweet.id);
    },
    {
      onMutate: async (tweet: Tweet) => {
        await queryClient.cancelQueries(queryKey);

        const prevData = queryClient.getQueryData<
          InfiniteData<TweetsResponse> | Tweet
        >(queryKey);

        if (!prevData) return { prevData };

        if ("pages" in prevData) {
          // check if it is an instance of InfiniteData
          queryClient.setQueryData<InfiniteData<TweetsResponse>>(
            queryKey,
            getUpdatedData(prevData, tweet)
          );
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
        queryClient.invalidateQueries('tweets');
      },
    }
  );

  return mutate;
};

export default useDeleteTweet;
