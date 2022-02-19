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
    (body: string) => {
      if (!currentUser) throw new Error("No Authentication");
      return createTweet(currentUser, { tweet: { body, parent_id: tweet_id } });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(repliesQueryKey),
    }
  );

  const onSubmit = async (
    { body }: { body: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!currentUser) return;

    await newTweet(body);
    resetForm();
  };

  const { toggleLike: toggleTweetLike } = useLikeTweet(tweetQueryKey);
  const { toggleRetweet: toggleTweetRetweet } = useRetweetTweet(tweetQueryKey);

  const { toggleLike: toggleRepliesLike } = useLikeTweet(repliesQueryKey);
  const { toggleRetweet: toggleRepliesRetweet } =
    useRetweetTweet(repliesQueryKey);

  if (!repliesValues.data || !tweetValues.data)
    return <p>Remove This component</p>;

  const { data: tweet } = tweetValues;
  const tweets = repliesValues.data.pages.reduce(
    (total: Itweet[], group) => total.concat(group.list),
    []
  );
  return (
    <>
      <Header title="Tweet" backLink />
      <BigTweet
        tweet={tweet}
        toggleLike={toggleTweetLike}
        toggleRetweet={toggleTweetRetweet}
      />
      <ReplyForm onSubmit={onSubmit} />
      <Tweets
        tweets={tweets}
        toggleLike={toggleRepliesLike}
        toggleRetweet={toggleRepliesRetweet}
      />
    </>
  );
};

export default Tweet;
