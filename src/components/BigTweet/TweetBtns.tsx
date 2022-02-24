import classnames from "classnames";
import { Tweet } from "../../api/tweets";

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";

interface Props {
  tweet: Tweet;
  toggleLike: () => void;
  toggleRetweet: () => void;
}

const TweetBtns = (props: Props) => {
  const { retweeted_by_user, liked_by_user } = props.tweet.tweet;

  return (
    <div className="flex justify-around pt-3">
      <button
        className={classnames(
          "mr-2 text-xl rounded-full p-1 transition-transform hover:bg-blue/10 hover:text-blue hover:scale-105 active:scale-95",
          {
            "text-blue": retweeted_by_user,
          }
        )}
        onClick={props.toggleRetweet}
      >
        <AiOutlineRetweet />
      </button>

      <button
        className={classnames(
          "mr-2 text-xl rounded-full p-1 transition-transform hover:bg-red/10 hover:text-red hover:scale-105 active:scale-95",
          {
            "text-red": liked_by_user,
          }
        )}
        onClick={props.toggleLike}
      >
        {liked_by_user ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
};

export default TweetBtns;
