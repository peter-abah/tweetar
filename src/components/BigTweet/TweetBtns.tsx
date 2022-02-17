import classnames from "classnames";
import { Tweet } from "../../api/tweets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

interface Props {
  tweet: Tweet;
  toggleLike: (tweet_id: string) => void;
  toggleRetweet: (tweet_id: string) => void;
}

const TweetBtns = (props: Props) => {
  const { retweeted_by_user, liked_by_user } = props.tweet.tweet;

  return (
    <div className="flex justify-around pt-3">
      <button onClick={() => props.toggleRetweet(props.tweet.data_id)}>
        <FontAwesomeIcon
          className={classnames("mr-2 text-xl text-neutral-600", {
            "!text-blue": retweeted_by_user,
          })}
          icon={faRetweet}
        />
      </button>

      <button onClick={() => props.toggleLike(props.tweet.data_id)}>
        <FontAwesomeIcon
          className={classnames("mr-2 text-xl text-neutral-600", {
            "!text-red": liked_by_user,
          })}
          icon={faHeart}
        />
      </button>
    </div>
  );
};

export default TweetBtns;
