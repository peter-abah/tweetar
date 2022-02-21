import { useAuth } from "../contexts/authContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";

const SignIn = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: any, setError: any) => {
    try {
      await login(values);
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
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Must be 3 characters or more.")
          .required("Enter your username."),
        password: Yup.string()
          .required("Enter your password")
          .min(8, "Password is too short - should be 8 characters minimum"),
      })}
      onSubmit={(values, { setFieldError }) =>
        handleSubmit(values, setFieldError)
      }
    >
      <div className="w-11/12 max-w-xs my-12 mx-auto py-8 px-4 rounded-2xl">
        <h1 className="text-3xl pb-4 font-bold">Tweeter</h1>
        <Form>
          <h2 className="text-2xl font-bold pb-3">Log in</h2>

          <FormField
            classname="my-4"
            label="Username:"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="peter"
          />

          <FormField
            classname="my-4"
            label="Password:"
            name="password"
            type="password"
            autoComplete="new-password"
          />

          <button
            className="block mt-8 max-w-xs mx-auto text-center py-2 w-full rounded-full text-bg bg-primary"
            type="submit"
          >
            Log in
          </button>
          <div className="mt-8 max-w-xs mx-auto">
            <p className="mb-2">Create a new account</p>
            <Link className="text-lg underline" to="/register">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default SignIn;
