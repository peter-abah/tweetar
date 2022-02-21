import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { useParams } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

import {
  createTweet,
  getTweet,
  getTweets,
  Tweet as Itweet,
} from "../api/tweets";

import Tweets from "../components/Tweets";
import BigTweet from "../components/BigTweet";
import ReplyForm from "../components/ReplyForm";
import Header from "../components/Header";
import { useLikeTweet, useRetweetTweet } from "../hooks";

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
    { body, files }: { body: string; files: FileList },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!currentUser || files.length > 4) return;

    const formData = new FormData();
    formData.append("tweet[body]", body);

    for (let file of files) {
      formData.append('tweet[images]', file);
    }

    await newTweet(formData);
    resetForm();
  };

  const { toggleLike: toggleTweetLike } = useLikeTweet(tweetQueryKey);
  const { toggleRetweet: toggleTweetRetweet } = useRetweetTweet(tweetQueryKey);

  const { toggleLike: toggleRepliesLike } = useLikeTweet(repliesQueryKey);
  const { toggleRetweet: toggleRepliesRetweet } =
    useRetweetTweet(repliesQueryKey);

  return (
    <>
      <Header title="Tweet" backLink />
      <BigTweet
        tweetValues={tweetValues}
        toggleLike={toggleTweetLike}
        toggleRetweet={toggleTweetRetweet}
      />
      <ReplyForm onSubmit={onSubmit} />
      <Tweets
        tweetsValues={repliesValues}
        toggleLike={toggleRepliesLike}
        toggleRetweet={toggleRepliesRetweet}
      />
    </>
  );
};

export default Tweet;
