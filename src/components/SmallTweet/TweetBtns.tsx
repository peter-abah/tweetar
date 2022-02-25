import classnames from "classnames";
import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";

import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment, FaBookmark, FaRegBookmark } from "react-icons/fa";

interface Props {
  tweet: Tweet;
  toggleLike: () => void;
  toggleRetweet: () => void;
  toggleBookmark: () => void;
}

const TweetBtns = (props: Props) => {
  const {
    retweets_count,
    likes_count,
    replies_count,
    retweeted_by_user,
    liked_by_user,
    bookmarked_by_user,
  } = props.tweet.tweet;

  const className =
    "flex items-center h-7 rounded-full p-1 transition-transform hover:scale-105 active:scale-95";

  return (
    <div className="flex justify-between pt-3 max-w-xs">
      <Link
        title="Reply"
        className={classnames(
          className,
          "hover:bg-emerald-700/10 hover:text-emerald-700"
        )}
        to={`/tweet/${props.tweet.id}`}
      >
        <FaRegComment className="text-base" />
        {replies_count > 0 && (
          <span className="pl-1 text-sm">{replies_count}</span>
        )}
      </Link>

      <button
        title="Retweet"
        className={classnames(className, "hover:bg-blue/10 hover:text-blue", {
          "text-blue": retweeted_by_user,
        })}
        onClick={props.toggleRetweet}
      >
        <AiOutlineRetweet className="text-lg" />
        {retweets_count > 0 && (
          <span className="pl-1 text-sm">{retweets_count}</span>
        )}
      </button>

      <button
        title="Like"
        className={classnames(className, "hover:bg-red/10 hover:text-red", {
          "text-red": liked_by_user,
        })}
        onClick={props.toggleLike}
      >
        {liked_by_user ? (
          <AiFillHeart className="text-lg" />
        ) : (
          <AiOutlineHeart className="text-lg" />
        )}
        {likes_count > 0 && <span className="pl-1 text-sm">{likes_count}</span>}
      </button>

      <button
        title="Save"
        className={classnames(className, "hover:bg-blue/10 hover:text-blue", {
          "text-blue": bookmarked_by_user,
        })}
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
