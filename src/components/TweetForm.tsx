import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/authContext";

interface Props {
  body: string;
  onSubmit: (values: { body: string }) => void;
}

const TweetForm = ({ body, onSubmit }: Props) => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <Formik
      initialValues={{
        body: body,
      }}
      validationSchema={Yup.object({
        body: Yup.string()
          .required("Tweet cannot be empty")
          .max(250, "Maximum of 250 characters"),
      })}
      onSubmit={onSubmit}
    >
      <Form className="flex gap-2 md:gap-6 p-2 md:p-4">
        <img
          className="w-12 h-12 rounded-full"
          src={currentUser.profile_image_url}
          alt={currentUser.name}
        />
        <div className="w-full flex flex-col px-4 border-neutral">
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
          <button
            className="w-fit px-4 py-1 ml-auto rounded-full bg-primary text-bg"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default TweetForm;
