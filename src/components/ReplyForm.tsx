import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

import { Tweet, createTweet } from "../api/tweets";
import { useNavigate } from "react-router-dom";

interface Props {
  tweetToReply: Tweet;
  onSubmit: (
    values: { body: string },
    functions: { resetForm: () => void }
  ) => void;
}
const ReplyForm = ({ tweetToReply, onSubmit }: Props) => {
  const { user: currentUser } = useAuth() as AuthContextInterface;

  if (!currentUser) return null;

  return (
    <Formik
      initialValues={{
        body: "",
      }}
      validationSchema={Yup.object({
        body: Yup.string()
          .required("Tweet cannot be empty")
          .max(250, "Maximum of 250 characters"),
      })}
      onSubmit={onSubmit}
    >
      <Form className="flex gap-2 md:gap-3 py-2 border-b border-neutral-300">
        <img
          className="w-12 h-12 rounded-full"
          src={currentUser.profile_image_url}
          alt={currentUser.name}
        />
        <div className="w-full flex flex-col px-4 border-neutral-300">
          <Field
            name="body"
            as="textarea"
            className="h-16 resize-none mb-2 border-b focus-visible:outline-none tracking-wide"
            id="tweet-body"
            placeholder="Tweet your reply"
          />
          <ErrorMessage
            className="text-red-600 text-sm"
            component="small"
            name="body"
          />
          <button
            className="w-fit px-4 py-1 ml-auto rounded-full bg-neutral-700 text-white"
            type="submit"
          >
            Reply
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReplyForm;
