import { Tweet as Itweet } from "../api/tweets";
import Tweet from "./Tweet";

const Tweets = ({ tweets }: { tweets: Itweet[] }) => {
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

export default Tweets;
