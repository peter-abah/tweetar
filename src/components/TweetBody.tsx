import { Link } from "react-router-dom";
import { Tweet } from "../api/tweets";
import TweetBtns from "./TweetBtns";

interface Props {
  tweet: Tweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetBody = (props: Props) => {
  const { tweet, toggleLike, toggleRetweet } = props;
  const { body, user } = tweet.tweet;

  return (
    <div className="flex">
      <Link className="w-fit h-fit mr-2" to={`/profile/${user.username}`}>
        <img
          className="w-12 h-12 rounded-full"
          src={user.profile_image_url}
          alt={user.name}
        />
      </Link>

      <div className="w-full">
        <p className="overflow-ellipsis overflow-y-hidden">
          <span className="pr-2 font-bold">{user.name}</span>
          <span className="text-neutral-700">@{user.username}</span>
        </p>

        <p>{body}</p>
        <TweetBtns
          tweet={tweet}
          toggleLike={toggleLike}
          toggleRetweet={toggleRetweet}
        />
      </div>
    </div>
  );
};

export default TweetBody;
