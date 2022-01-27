import { Tweet as Itweet } from "../data";
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
