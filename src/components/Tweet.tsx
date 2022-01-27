import { Tweet as Itweet } from "../data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const Tweet = (props: { tweet: Itweet }) => {
  const { body, user, commentsNo, retweetsNo, likesNo } = props.tweet;
  return (
    <div className="flex p-2 w-full max-w-sm border-t border-neutral-600 last:border-b">
      <img
        className="w-1/6 h-1/6 rounded-full mr-2"
        src={user.image}
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
            {commentsNo}
          </button>
          <button>
            <FontAwesomeIcon className="mr-2" icon={faRetweet} />
            {retweetsNo}
          </button>
          <button>
            <FontAwesomeIcon className="mr-2" icon={faHeart} />
            {likesNo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
