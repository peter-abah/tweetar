import { useAuth, AuthContextInterface } from "../contexts/authContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";

const SignIn = () => {
  const { login } = useAuth() as AuthContextInterface;
  const navigate = useNavigate();

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
      onSubmit={(values) => {
        console.log("loading");
        login(values)
          .then(() => navigate("/"))
          .catch((e) => console.log(e))
          .finally(() => console.log("done"));
      }}
    >
      <div className="w-11/12 max-w-md my-12 mx-auto py-8 px-4 rounded-2xl bg-neutral-100 shadow-lg">
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
            className="block text-center py-2 w-full rounded-full text-white bg-neutral-600"
            type="submit"
          >
            Log in
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default SignIn;
