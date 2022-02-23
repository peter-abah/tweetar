import { useState } from "react";
import { useAuth } from "../contexts/authContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import FormTextArea from "../components/FormTextArea";
import Loader from "../components/Loader";
import ProfileImages from "../components/ProfileImages";
import Header from "../components/Header";
import { updateUserProfile } from "../api/users";
import { useProfileFormData } from "../hooks";

const EditProfile = () => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const buildFormData = useProfileFormData();

  const handleSubmit = async (values: any, setError: any) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const formData = await buildFormData(values);
      const user = await updateUserProfile(currentUser, formData);

      updateUser(user);
      navigate(`/profile/${currentUser.username}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImgChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    setField: (url: string) => void,
    prevUrl: string
  ) => {
    const img = ev.target.files?.[0];

    URL.revokeObjectURL(prevUrl);
    const url = img ? URL.createObjectURL(img) : "";
    setField(url);
  };

  if (!currentUser) return null;
  const { first_name, last_name, profile_image_url, cover_image_url, bio } =
    currentUser;

  return (
    <Formik
      initialValues={{
        first_name,
        last_name,
        bio,
        profile_image_url,
        cover_image_url,
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("Enter your first name."),
        last_name: Yup.string().required("Enter your last name."),
        bio: Yup.string()
          .min(3, "Must be 3 characters or more.")
          .max(250, "Maximum of 250 characters")
          .required("Enter your username."),
      })}
      onSubmit={(values, { setFieldError }) =>
        handleSubmit(values, setFieldError)
      }
    >
      {({ values, setFieldValue }) => (
        <>
          <Header title="Edit Profile" backLink />
          {loading ? (
            <Loader />
          ) : (
            <>
              <ProfileImages
                profile_image_url={values.profile_image_url}
                cover_image_url={values.cover_image_url}
                handleProfileImgChange={(ev) =>
                  handleImgChange(
                    ev,
                    setFieldValue.bind(null, "profile_image_url"),
                    values.profile_image_url
                  )
                }
                handleCoverImgChange={(ev) =>
                  handleImgChange(
                    ev,
                    setFieldValue.bind(null, "cover_image_url"),
                    values.cover_image_url
                  )
                }
              />
              <Form className="p-4 mt-12 md:mt-16">
                <FormField
                  classname="my-3"
                  label="First Name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Peter"
                />

                <FormField
                  classname="my-3"
                  label="Last Name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Abah"
                />

                <FormTextArea
                  classname="my-3"
                  label="Bio"
                  name="bio"
                  autoComplete="username"
                  placeholder="peter"
                />

                <button
                  className="block ml-auto my-3 text-center py-2 w-fit px-4 rounded-full text-bg bg-primary"
                  type="submit"
                >
                  Save
                </button>
              </Form>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default EditProfile;
