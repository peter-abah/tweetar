import { Link } from "react-router-dom";
import { Tweet } from "../api/tweets";

const TweetInfo = ({ type, user }: Tweet) => {
  if (!user) return null;

  return type === "like" ? (
    <Link
      to={`/profile/${user.username}`}
      className="text-xs ml-4 text-neutral-700 whitespace-nowrap text-ellipsis"
    >
      {user.name} Liked
    </Link>
  ) : (
    <Link
      to={`/profile/${user.username}`}
      className="text-xs ml-4 text-neutral-700 whitespace-nowrap text-ellipsis"
    >
      {user.name} Retweeted
    </Link>
  );
};

export default TweetInfo;
