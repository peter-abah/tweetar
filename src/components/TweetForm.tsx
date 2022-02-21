import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";

import ImageUploading, { ImageListType } from "react-images-uploading";

import fallbackImg from "../assets/defaultAvatar.png";
import ImageUploader from "./ImageUploader";

interface Props {
  values: { body: string; images: ImageListType };
  onSubmit: (
    values: {
      body: string;
      images: any[];
    },
    funcs: { resetForm: () => void }
  ) => void;
}

const TweetForm = ({ values, onSubmit }: Props) => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const handleChange = (
    images: ImageListType,
    setField: (...all: any) => void
  ) => {
    setField("images", images);
  };

  return (
    <Formik
      initialValues={{
        body: values.body,
        images: values.images,
      }}
      validationSchema={Yup.object({
        body: Yup.string()
          .required()
          .min(2, "Minimum of 2 characters")
          .max(250, "Maximum of 250 characters"),
      })}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form className="flex gap-2 md:gap-6 p-2 md:p-4">
          <img
            className="w-12 h-12 rounded-full"
            src={currentUser.profile_image_url || fallbackImg}
            alt={currentUser.name}
          />
          <div className="w-full flex flex-col border-neutral">
            <Field
              name="body"
              as="textarea"
              className="h-32 resize-none mb-2 border-b focus-visible:outline-none bg-bg"
              id="tweet-body"
              placeholder="What's happening?"
            />
            <ErrorMessage
              className="text-red-600 text-sm"
              component="small"
              name="body"
            />
            <ImageUploader
              images={props.values.images}
              onChange={(images) => handleChange(images, props.setFieldValue)}
            />
            <button
              className="w-fit px-4 py-1 ml-auto rounded-full bg-primary text-bg"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TweetForm;
