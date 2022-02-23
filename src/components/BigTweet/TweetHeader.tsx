import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";

import fallbackImg from "../../assets/defaultAvatar.png";
import TweetOptions from "../TweetOptions";

interface Props {
  tweet: Tweet;
  deleteTweet: () => void;
}
const TweetUser = ({ tweet, deleteTweet }: Props) => {
  const { user } = tweet.tweet;
  return (
    <div className="flex pb-4 items-start">
      <Link
        className="w-fit h-fit mr-2 shrink-0"
        to={`/profile/${user.username}`}
      >
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={user.profile_image_url || fallbackImg}
          alt={user.name}
        />
      </Link>

      <Link to={`/profile/${user.username}`} className="flex flex-col">
        <span className="font-bold">{user.name}</span>
        <span className="">@{user.username}</span>
      </Link>

      <TweetOptions values={[["Delete Tweet", deleteTweet]]} />
    </div>
  );
};

export default TweetUser;
