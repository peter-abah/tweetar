import classnames from "classnames";
import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

interface Props {
  tweet: Tweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetBtns = (props: Props) => {
  const {
    retweets_count,
    likes_count,
    replies_count,
    retweeted_by_user,
    liked_by_user,
  } = props.tweet.tweet;

  return (
    <div className="flex gap-12 md:gap-20 pt-3 max-w-xs">
      <Link
        title="Reply"
        className="block mr-2 rounded-full p-1 transition-transform hover:bg-emerald-700/10 hover:text-emerald-700 hover:scale-105 active:scale-95"
        to={`/tweet/${props.tweet.id}`}
      >
        <FontAwesomeIcon icon={faComment} />
        {replies_count > 0 && <span className="pl-1">{replies_count}</span>}
      </Link>
      <button
        title="Retweet"
        className={classnames(
          "mr-2 rounded-full p-1 transition-transform hover:bg-blue/10 hover:text-blue hover:scale-105 active:scale-95",
          {
            "text-blue": retweeted_by_user,
          }
        )}
        onClick={() => props.toggleRetweet(props.tweet.data_id)}
      >
        <FontAwesomeIcon icon={faRetweet} />
        {retweets_count > 0 && <span className="pl-1">{retweets_count}</span>}
      </button>
      <button
        title="Like"
        className={classnames(
          "mr-2 rounded-full p-1 transition-transform hover:bg-red/10 hover:text-red hover:scale-105 active:scale-95",
          {
            "text-red": liked_by_user,
          }
        )}
        onClick={() => props.toggleLike(props.tweet.data_id)}
      >
        <FontAwesomeIcon icon={faHeart} />
        {likes_count > 0 && <span className="pl-1">{likes_count}</span>}
      </button>
    </div>
  );
};

export default TweetBtns;
