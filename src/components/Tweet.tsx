import { useState } from "react";

import { ContextInterface, useAuth } from "../contexts/authContext";
import { retweetTweet, likeTweet, Tweet as Itweet } from "../api/tweets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

const Tweet = (props: { tweet: Itweet }) => {
  const { user: currentUser } = useAuth() as ContextInterface;
  const [tweet, setTweet] = useState(props.tweet);

  const retweet = async () => {
    if (!currentUser) return;

    const retweet = await retweetTweet(currentUser, tweet.id);
    setTweet(retweet.tweet);
  };

  const like = async () => {
    if (!currentUser) return;

    const like = await likeTweet(currentUser, tweet.id);
    setTweet(like.tweet)
  };

  const { body, user, replies_count, retweets_count, likes_count } =
    tweet;
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
          <button onClick={retweet}>
            <FontAwesomeIcon className="mr-2" icon={faRetweet} />
            {retweets_count}
          </button>
          <button onClick={like}>
            <FontAwesomeIcon className="mr-2" icon={faHeart} />
            {likes_count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
