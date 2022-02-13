import classnames from "classnames";
import { Tweet } from "../api/tweets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";


interface Props {
  tweet: Tweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetBody = (props: Props) => {
  const {
    id,
    body,
    user,
    replies_count,
    retweets_count,
    likes_count,
    liked_by_user,
    retweeted_by_user,
  } = props.tweet.tweet;

  return (
    <div className="flex">
      <img
        className="w-1/6 h-1/6 rounded-full mr-2"
        src={user.profile_image_url}
        alt={user.name}
      />

      <div>
        <p className="overflow-ellipsis overflow-y-hidden">
          <span className="text-sm pr-2">{user.name}</span>
          <span className="text-xs">@{user.username}</span>
        </p>

        <p>{body}</p>
        <div className="flex justify-between">
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
      </div>
    </div>
  );
};

export default TweetBody;