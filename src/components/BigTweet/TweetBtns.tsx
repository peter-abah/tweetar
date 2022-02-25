import classnames from "classnames";
import { Tweet } from "../../api/tweets";

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface Props {
  tweet: Tweet;
  toggleLike: () => void;
  toggleRetweet: () => void;
  toggleBookmark: () => void;
}

const TweetBtns = (props: Props) => {
  const { retweeted_by_user, liked_by_user, bookmarked_by_user } =
    props.tweet.tweet;
  const btnClassname =
    "mr-2 text-xl rounded-full p-1 transition-transform hover:scale-105 active:scale-95";
  return (
    <div className="flex justify-around pt-3">
      <button
        title="Retweet"
        className={classnames(
          btnClassname,
          "hover:bg-blue/10 hover:text-blue",
          {
            "text-blue": retweeted_by_user,
          }
        )}
        onClick={props.toggleRetweet}
      >
        <AiOutlineRetweet />
      </button>

      <button
        title="Like"
        className={classnames(btnClassname, "hover:bg-red/10 hover:text-red", {
          "text-red": liked_by_user,
        })}
        onClick={props.toggleLike}
      >
        {liked_by_user ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>

      <button
        title="Save"
        className={classnames(
          btnClassname,
          "hover:bg-blue/10 hover:text-blue",
          {
            "text-blue": bookmarked_by_user,
          }
        )}
        onClick={props.toggleBookmark}
      >
        {bookmarked_by_user ? (
          <FaBookmark className="" />
        ) : (
          <FaRegBookmark className="" />
        )}
      </button>
    </div>
  );
};

export default TweetBtns;
