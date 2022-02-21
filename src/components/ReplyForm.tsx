import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

import fallbackImg from "../assets/defaultAvatar.png";

interface Props {
  onSubmit: (
    values: { body: string, files: FileList },
    functions: { resetForm: () => void }
  ) => void;
}
const ReplyForm = ({ onSubmit }: Props) => {
  const { currentUser } = useAuth() as AuthContextInterface;

  if (!currentUser) return null;

  return (
    <Formik
      initialValues={{
        body: "",
        files: [] as unknown as FileList,
      }}
      validationSchema={Yup.object({
        body: Yup.string().max(250, "Maximum of 250 characters"),
      })}
      onSubmit={onSubmit}
    >
      <Form className="flex gap-2 md:gap-3 py-2 border-b border-neutral">
        <img
          className="w-12 h-12 rounded-full"
          src={currentUser.profile_image_url || fallbackImg}
          alt={currentUser.name}
        />
        <div className="w-full flex flex-col px-4 border-neutral">
          <Field
            name="body"
            as="textarea"
            autoFocus
            className="h-16 resize-none mb-2 bg-inherit border-b focus-visible:outline-none tracking-wide"
            id="tweet-body"
            placeholder="Tweet your reply"
          />
          <ErrorMessage
            className="text-red text-sm"
            component="small"
            name="body"
          />
          <button
            className="w-fit px-4 py-1 ml-auto rounded-full bg-primary text-bg"
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
