import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Tweet } from "../api/tweets";

const TweetInfo = ({ type, user, tweet }: Tweet) => {
  const { currentUser } = useAuth();
  const className = "text-xs ml-4 whitespace-nowrap text-ellipsis";

  if (tweet.parent) {
    const username = tweet.parent.tweet.user.username;
    return (
      <Link className={className} to={`/tweet/${tweet.parent.id}`}>
        Replying to @{username}
      </Link>
    );
  }

  if (!user) return null;

  const name = user.id === currentUser?.id ? "You" : user.name;

  if (type === "like") {
    return (
      <Link to={`/profile/${user.username}`} className={className}>
        {name} Liked
      </Link>
    );
  }

  if (type === "retweet") {
    return (
      <Link to={`/profile/${user.username}`} className={className}>
        {name} Retweeted
      </Link>
    );
  }

  return null;
};

export default TweetInfo;
