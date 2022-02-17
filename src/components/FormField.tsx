import { useField } from "formik";

interface Iprops {
  classname?: string;
  label: string;
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
}

const FormField = ({ classname = '', label, ...props }: Iprops) => {
  const [field, meta] = useField(props);

  return (
    <div className={`w-full ${classname}`}>
      <div className="py-1 px-3 rounded-lg flex flex-col border focus-within:border-neutral">
        <label className="text-sm pb-0.5" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input
          className="bg-inherit focus-visible:outline-none"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
          <p className="pl-2 text-xs text-red">{meta.error}</p>
        ) : null}
    </div>
  );
};

export default FormField;
