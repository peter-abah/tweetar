import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { createTweet } from "../api/tweets";
import { useAuth } from "../contexts/authContext";
import TweetForm from "../components/TweetForm";
import Header from "../components/Header";
import { ImageListType } from "react-images-uploading";

const NewTweet = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: newTweet } = useMutation(
    (formData: FormData) => {
      if (!currentUser) throw new Error("No Authentication");
      return createTweet(currentUser, formData);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("tweets"),
    }
  );

  const onSubmit = async (
    { body, images }: { body: string; images: ImageListType },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!currentUser || images.length > 4) return;

    const formData = new FormData();
    formData.append("tweet[body]", body);

    for (let img of images) {
      if (img.file) formData.append("tweet[images][]", img.file);
    }

    await newTweet(formData);
    resetForm();
    navigate(-1);
  };

  if (!currentUser) return null;

  return (
    <>
      <Header title="Create Tweet" backLink />
      <TweetForm values={{ body: "", images: [] }} onSubmit={onSubmit} />;
    </>
  );
};

export default NewTweet;
