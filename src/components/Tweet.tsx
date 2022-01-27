import { Tweet as Itweet } from "../data";

const Tweet = (props: { tweet: Itweet }) => {
  return (
    <div className="p-4 shadow-lg w-80 m-4">
      {props.tweet.body}
    </div>
  );
};

export default Tweet;
