import { Link } from 'react-router-dom';
import { Tweet } from "../../api/tweets";

const TweetUser = ({ tweet }: { tweet: Tweet }) => {
  const { user } = tweet.tweet;
  return (
    <div className='flex pb-4'>
      <Link
        className="w-fit h-fit mr-2 shrink-0"
        to={`/profile/${user.username}`}
      >
        <img
          className="w-12 h-12 rounded-full"
          src={user.profile_image_url}
          alt={user.name}
        />
      </Link>

      <div className='flex flex-col'>
        <span>{user.name}</span>
        <span className='text-neutral-700'>@{user.username}</span>
      </div>
    </div>
  );
};

export default TweetUser;
