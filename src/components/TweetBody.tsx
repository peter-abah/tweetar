import { formatDistanceToNow, parseISO } from "date-fns/esm";
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
  const { body, user, updated_at } = tweet.tweet;

  const tweetTime = formatDistanceToNow(parseISO(updated_at));

  return (
    <div className="flex w-full">
      <Link className="w-fit h-fit mr-2 shrink-0" to={`/profile/${user.username}`}>
        <img
          className="w-12 h-12 rounded-full"
          src={user.profile_image_url}
          alt={user.name}
        />
      </Link>

      <div className="w-4/5">
        <div className="w-full overflow-x-hidden whitespace-nowrap overflow-y-hidden flex gap-2 items-center">
          <span className="pr-2 font-bold">{user.name}</span>
          <span className="text-neutral-700">@{user.username}</span>
          <span className="text-neutral-700 text-sm">{tweetTime} ago</span>
        </div>

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
