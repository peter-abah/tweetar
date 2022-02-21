import { format, parseISO } from "date-fns";
import { Tweet } from "../../api/tweets";
import TweetImages from "../TweetImages";

const TweetBody = ({ tweet }: { tweet: Tweet }) => {
  const { body, updated_at, image_urls } = tweet.tweet;
  const tweetDate = format(parseISO(updated_at), "h:mm b LLL d, yyyy");
  return (
    <div>
      <p className="text-2xl whitespace-pre-wrap">{body}</p>
      <TweetImages images={image_urls} />
      <p className="py-4">{tweetDate}</p>
    </div>
  );
};

export default TweetBody;
