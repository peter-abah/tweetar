import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import ImageUploader from "./ImageUploader";
import { ImageListType } from "react-images-uploading";

import fallbackImg from "../assets/defaultAvatar.png";

interface Props {
  onSubmit: (
    values: { body: string; images: ImageListType },
    functions: { resetForm: () => void }
  ) => void;
}
const ReplyForm = ({ onSubmit }: Props) => {
  const { currentUser } = useAuth() as AuthContextInterface;

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
        body: "",
        images: [] as unknown as ImageListType,
      }}
      validationSchema={Yup.object({
        body: Yup.string()
          .min(2, "Mininum of 2 characters")
          .max(250, "Maximum of 250 characters"),
      })}
      onSubmit={onSubmit}
    >
      {(props) => (
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
            <ImageUploader
              images={props.values.images}
              onChange={(images) => handleChange(images, props.setFieldValue)}
            />
            <button
              className="w-fit px-4 py-1 ml-auto rounded-full bg-primary text-bg"
              type="submit"
            >
              Reply
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReplyForm;
