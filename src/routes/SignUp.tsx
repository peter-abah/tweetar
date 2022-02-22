import { useAuth } from "../contexts/authContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const SignUp = () => {
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: any, setError: any) => {
    try {
      await signUp({ user: values });
      navigate("/");
    } catch (e: any) {
      const { data } = e.response;

      for (let field of Object.keys(data.error)) {
        if (field in values) {
          setError(field, data.error[field]);
        }
      }
    }
  };

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
      onSubmit={(values, { setFieldError }) =>
        handleSubmit(values, setFieldError)
      }
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="theme-light max-w-screen-sm w-11/12 my-12 mx-auto py-8 px-4 rounded-2xl">
          <h1 className="text-3xl pb-4 font-bold">Tweeter</h1>
          <Form>
            <h2 className="text-2xl font-bold pb-3">Create your account</h2>

            <div className="flex gap-4 my-4 flex-col md:flex-row">
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

            <div className="flex gap-4 my-4 flex-col md:flex-row">
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

            <div className="flex gap-4 my-4 flex-col md:flex-row">
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
              className="block mx-auto max-w-xs text-center py-2 w-full rounded-full text-bg bg-primary"
              type="submit"
            >
              Sign Up
            </button>

            <div className="mt-8 max-w-xs mx-auto">
              <p className="mb-2">Already have an account?</p>
              <Link className="text-lg underline" to="/login">
                Log in
              </Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
