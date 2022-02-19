import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit: (values: { query: string }) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        query: "",
      }}
      validationSchema={Yup.object({
        query: Yup.string().required(),
      })}
      onSubmit={onSubmit}
    >
      <Form className="sticky top-0 flex items-center gap-2 px-4 py-3 bg-bg/60 backdrop-blur-md">
        <button className="mr-8" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex relative grow">
          <Field
            className="pl-4 pr-8 py-1 text-lg rounded-full w-full bg-bg border border-neutral focus-visible:outline-none"
            name="query"
            id="search-query"
            placeholder="Search"
          />
          <button className="absolute top-0 bottom-0 right-4" type="submit">
            <FontAwesomeIcon
              className="!text-xl text-neutral"
              icon={faSearch}
            />
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SearchForm;
