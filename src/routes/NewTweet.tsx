import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createTweet } from "../api/tweets";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import TweetForm from "../components/TweetForm";

const NewTweet = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth() as AuthContextInterface;

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser]);

  const onSubmit = async ({ body }: { body: string }) => {
    if (!currentUser) return;
    createTweet(currentUser, { tweet: { body } }).then(() => navigate("/"));
  };

  if (!currentUser) return null;

  return <TweetForm body="" onSubmit={onSubmit} />;
};

export default NewTweet;
