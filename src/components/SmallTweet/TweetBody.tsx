import { formatDistanceToNow, parseISO } from "date-fns/esm";
import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";
import TweetBtns from "./TweetBtns";

import fallbackImg from '../../assets/defaultAvatar.png';
import TweetImages from "../TweetImages";

interface Props {
  tweet: Tweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetBody = (props: Props) => {
  const { tweet, toggleLike, toggleRetweet } = props;
  const { id, body, user, updated_at, image_urls } = tweet.tweet;

  const tweetTime = formatDistanceToNow(parseISO(updated_at));

  return (
    <div className="flex w-full">
      <Link
        className="w-fit h-fit mr-2 shrink-0"
        to={`/profile/${user.username}`}
      >
        <img
          className="w-12 h-12 rounded-full"
          src={user.profile_image_url || fallbackImg}
          alt={user.name}
        />
      </Link>

      <div className="w-4/5">
        <Link className="block" to={`/tweet/${id}`}>
          <div className="w-full overflow-x-hidden whitespace-nowrap overflow-y-hidden flex gap-2 items-center">
            <span className="pr-2 font-bold">{user.name}</span>
            <span className="">@{user.username}</span>
            <span className="text-sm">{tweetTime} ago</span>
          </div>

          <p>{body}</p>
        </Link>
        <TweetImages images={image_urls} />
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
