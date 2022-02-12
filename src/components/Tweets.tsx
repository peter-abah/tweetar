import { Tweet as Itweet, likeTweet, retweetTweet } from "../api/tweets";
import Tweet from "./Tweet";

const Tweets = (props: {
  tweets: Itweet[];
  like: (tweet_id: string) => void;
  retweet: (tweet_id: string) => void;
}) => {
  const { tweets, like, retweet } = props;
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} like={like} retweet={retweet} />
      ))}
    </>
  );
};

export default Tweets;
