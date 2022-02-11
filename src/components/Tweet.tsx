import { Tweet as Itweet } from "../api/tweets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const Tweet = (props: { tweet: Itweet }) => {
  const { body, user, replies_count, retweets_count, likes_count } =
    props.tweet;

  return (
    <div className="flex p-2 w-full max-w-sm border-t border-neutral-600 last:border-b">
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
        <div className="flex justify-between px-4">
          <button>
            <FontAwesomeIcon className="mr-2" icon={faComment} />
            {replies_count}
          </button>
          <button>
            <FontAwesomeIcon className="mr-2" icon={faRetweet} />
            {retweets_count}
          </button>
          <button>
            <FontAwesomeIcon className="mr-2" icon={faHeart} />
            {likes_count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
