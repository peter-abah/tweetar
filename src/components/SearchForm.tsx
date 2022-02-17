import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit: (values: { query: string }) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
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
      <Form className="flex items-center gap-2 px-2 py-3">
        <div className="flex relative grow">
          <Field
            className="pl-4 pr-8 py-1 text-lg rounded-full w-full bg-bg border border-neutral focus-visible:outline-none"
            name="query"
            id="search-query"
            placeholder="Search"
          />
          <button className="absolute top-0 bottom-0 right-4" type="submit">
            <FontAwesomeIcon className="!text-xl text-neutral" icon={faSearch} />
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SearchForm;
