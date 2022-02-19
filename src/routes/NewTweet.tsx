import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { createTweet } from "../api/tweets";
import { useAuth } from "../contexts/authContext";
import TweetForm from "../components/TweetForm";
import Header from "../components/Header";

const NewTweet = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser, navigate]);

  const { mutate: newTweet } = useMutation(
    (body: string) => {
      if (!currentUser) throw new Error("No Authentication");
      return createTweet(currentUser, { tweet: { body } });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("tweets"),
    }
  );

  const onSubmit = async ({ body }: { body: string }) => {
    if (!currentUser) return;
    await newTweet(body);
    navigate("/");
  };

  if (!currentUser) return null;

  return (
    <>
      <Header title="Create Tweet" backLink />
      <TweetForm body="" onSubmit={onSubmit} />;
    </>
  );
};

export default NewTweet;
