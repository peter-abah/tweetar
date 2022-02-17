import { Link } from "react-router-dom";
import { Tweet } from "../../api/tweets";

const TweetStats = ({ tweet }: { tweet: Tweet }) => {
  const { retweets_count, likes_count, replies_count } = tweet.tweet;
  return (
    <div className="flex gap-3">
      <Link to={`/retweets/${tweet.id}`}>
        <span className="font-bold">{retweets_count}</span>
        <span> Retweets</span>
      </Link>

      <Link to={`/likes/${tweet.id}`}>
        <span className="font-bold">{likes_count}</span> <span> Likes</span>
      </Link>

      <p>
        <span className="font-bold">{replies_count}</span> <span> Replies</span>
      </p>
    </div>
  );
};

export default TweetStats;
