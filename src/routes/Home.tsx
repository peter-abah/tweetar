import { getTweets } from "../data";
import Tweets from "../components/Tweets";

const Home = () => {
  const data = getTweets();
  return (
    <main>
      <Tweets tweets={data} />
    </main>
  );
};

export default Home;
