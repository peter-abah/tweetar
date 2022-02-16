import { format, parseISO } from 'date-fns';
import { Tweet } from "../../api/tweets";

const TweetBody = ({ tweet }: { tweet: Tweet }) => {
  const { body, updated_at } = tweet.tweet;
  const tweetDate = format(parseISO(updated_at), 'h:mm b LLL d, yyyy')
  return (
    <div>
      <p className='text-2xl'>{body}</p>
      <p className='py-4 text-neutral-600'>{tweetDate}</p>
    </div>
  )
};

export default TweetBody;
