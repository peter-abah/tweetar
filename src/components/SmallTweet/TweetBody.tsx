import { formatDistanceToNow, parseISO } from "date-fns/esm";
import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";
import TweetBtns from "./TweetBtns";

import fallbackImg from "../../assets/defaultAvatar.png";
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

      <div className="grow overflow-hidden">
        <div className="max-w-full whitespace-nowrap text-ellipsis flex gap-2 items-center">
          <Link className="flex gap-2" to={`/profile/${user.username}`}>
            <span className="font-bold hover:underline">{user.name}</span>
            <span className="shrink">@{user.username}</span>
          </Link>
          <span className="text-sm">{tweetTime} ago</span>
        </div>
        <Link className="block" to={`/tweet/${id}`}>
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
