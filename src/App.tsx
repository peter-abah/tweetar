import { Routes, Route } from "react-router-dom";
import { Layout, Home, SignUp, SignIn, Profile, NewTweet, Tweet } from "./routes";
import AllProviders from "./contexts";

function App() {
  return (
    <AllProviders>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/new" element={<NewTweet />} />
          <Route path="/tweet/:tweetId" element={<Tweet />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </AllProviders>
  );
}

export default App;
