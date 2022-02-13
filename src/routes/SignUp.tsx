import { useAuth, AuthContextInterface } from "../contexts/authContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";

const SignUp = () => {
  const { signUp } = useAuth() as AuthContextInterface;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={Yup.object({
        first_name: Yup.string()
          .min(3, "First name must be 3 characters or more.")
          .required("Enter your first name."),
        last_name: Yup.string()
          .min(3, "Last name must be 3 characters or more.")
          .required("Enter your last name."),
        username: Yup.string()
          .min(3, "Must be 3 characters or more.")
          .required("Enter your username."),
        email: Yup.string()
          .email("Enter a valid email")
          .required("Enter your email."),
        password: Yup.string()
          .required("Enter your password")
          .min(8, "Password is too short - should be 8 characters minimum"),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords must match"
        ),
      })}
      onSubmit={(values) => {
        console.log("loading");
        signUp({ user: values })
          .then(() => navigate("/"))
          .catch((e) => console.log(e))
          .finally(() => console.log("done"));
      }}
    >
      <div className="max-w-screen-sm w-11/12 my-12 mx-auto py-8 px-4 rounded-2xl bg-neutral-100 shadow-lg">
        <h1 className="text-3xl pb-4 font-bold">Tweeter</h1>
        <Form>
          <h2 className="text-2xl font-bold pb-3">Create your account</h2>

          <div className="flex gap-4 my-4 md:flex-row">
            <FormField
              label="First Name:"
              name="first_name"
              type="text"
              autoComplete="given-name"
              placeholder="Peter"
            />

            <FormField
              label="Last Name:"
              name="last_name"
              type="text"
              autoComplete="family-name"
              placeholder="Abah"
            />
          </div>

          <div className="flex gap-4 my-4 md:flex-row">
            <FormField
              label="Username:"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="peter"
            />

            <FormField
              label="Email:"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="peter@email.com"
            />
          </div>

          <div className="flex gap-4 my-4 md:flex-row">
            <FormField
              label="Password:"
              name="password"
              type="password"
              autoComplete="new-password"
            />

            <FormField
              label="Confirm Password:"
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <button
            className="block text-center py-2 w-full rounded-lg text-white bg-neutral-600"
            type="submit"
          >
            Sign Up
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default SignUp;
