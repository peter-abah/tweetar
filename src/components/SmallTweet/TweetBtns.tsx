import classnames from "classnames";
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
    <div className="flex gap-12 pt-3 max-w-xs">
      <button>
        <FontAwesomeIcon className="mr-2" icon={faComment} />
        {replies_count}
      </button>
      <button onClick={() => props.toggleRetweet(props.tweet.data_id)}>
        <FontAwesomeIcon
          className={classnames("mr-2", {
            "text-emerald-700": retweeted_by_user,
          })}
          icon={faRetweet}
        />
        {retweets_count}
      </button>
      <button onClick={() => props.toggleLike(props.tweet.data_id)}>
        <FontAwesomeIcon
          className={classnames("mr-2", { "text-red-700": liked_by_user })}
          icon={faHeart}
        />
        {likes_count}
      </button>
    </div>
  );
};

export default TweetBtns;
