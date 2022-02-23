import { Routes, Route } from "react-router-dom";
import {
  Layout,
  Home,
  SignUp,
  SignIn,
  Profile,
  NewTweet,
  Tweet,
  Retweets,
  Likes,
  Search,
  EditProfile,
} from "./routes";
import Wrapper from "./components/Wrapper";
import AllProviders from "./contexts";

function App() {
  return (
    <AllProviders>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route path="profile/:username/edit" element={<EditProfile />} />
            <Route path="/new" element={<NewTweet />} />
            <Route path="/tweet/:tweet_id" element={<Tweet />} />{" "}
            <Route path="/likes/:tweetId" element={<Likes />} />
            <Route path="/retweets/:tweetId" element={<Retweets />} />
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Wrapper>
    </AllProviders>
  );
}

export default App;
