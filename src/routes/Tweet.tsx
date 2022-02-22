import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { useParams } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

import { createTweet, getTweet, getTweets } from "../api/tweets";

import { ImageListType } from "react-images-uploading";

import Tweets from "../components/Tweets";
import BigTweet from "../components/BigTweet";
import ReplyForm from "../components/ReplyForm";
import Header from "../components/Header";
import { useLikeTweet, useRetweetTweet, useDeleteTweet } from "../hooks";

const Tweet = () => {
  const { currentUser } = useAuth() as AuthContextInterface;
  const { tweet_id } = useParams() as { tweet_id: string };
  const queryClient = useQueryClient();

  const tweetQueryKey = ["tweet", tweet_id, currentUser];
  const repliesQueryKey = ["replies", tweet_id, currentUser];

  const tweetValues = useQuery(tweetQueryKey, () =>
    getTweet(currentUser, tweet_id)
  );
  const repliesValues = useInfiniteQuery(
    repliesQueryKey,
    ({ pageParam = 1 }) =>
      getTweets(currentUser, { parent_id: tweet_id, page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.current_page + 1 }
  );

  const { mutate: newTweet } = useMutation(
    (formData: FormData) => {
      if (!currentUser) throw new Error("No Authentication");
      return createTweet(currentUser, formData);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(repliesQueryKey),
    }
  );

  const onSubmit = async (
    { body, images }: { body: string; images: ImageListType },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!currentUser || images.length > 4) return;

    const formData = new FormData();
    formData.append("tweet[body]", body);
    formData.append("tweet[parent_id", tweet_id);

    for (let img of images) {
      if (img.file) formData.append("tweet[images][]", img.file);
    }

    await newTweet(formData);
    resetForm();
  };

  const { toggleLike: toggleTweetLike } = useLikeTweet(tweetQueryKey);
  const { toggleRetweet: toggleTweetRetweet } = useRetweetTweet(tweetQueryKey);
  const deleteTweet = useDeleteTweet(tweetQueryKey);

  const { toggleLike: toggleRepliesLike } = useLikeTweet(repliesQueryKey);
  const { toggleRetweet: toggleRepliesRetweet } =
    useRetweetTweet(repliesQueryKey);
  const deleteReply = useDeleteTweet(repliesQueryKey);

  return (
    <>
      <Header title="Tweet" backLink />
      <BigTweet
        tweetValues={tweetValues}
        toggleLike={toggleTweetLike}
        toggleRetweet={toggleTweetRetweet}
        deleteTweet={deleteTweet}
      />
      <ReplyForm onSubmit={onSubmit} />
      <Tweets
        tweetsValues={repliesValues}
        toggleLike={toggleRepliesLike}
        toggleRetweet={toggleRepliesRetweet}
        deleteTweet={deleteReply}
      />
    </>
  );
};

export default Tweet;
