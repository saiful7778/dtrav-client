import cn from "@/lib/cn";
import { useField } from "formik";
import PropTypes from "prop-types";

const style = {
  base: "border border-gray-400 select-none appearance-none rounded-md px-3 py-2 text-sm",
  error: "border-red-600 text-red-600",
  size: {
    xs: "min-w-52",
    sm: "min-w-64",
    md: "min-w-80",
  },
};

const Select = ({ options, className, defaultValue, ...props }) => {
  const [field, { touched, error }] = useField(props);

  return (
    <div>
      <select
        className={cn(
          "select",
          style.base,
          style.size.md,
          error && touched && style.error,
          (error && touched) || field.value || "text-gray-500",
          className,
        )}
        {...field}
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {options?.map((data) => (
          <option key={data.value} value={data.value}>
            {data.text}
          </option>
        ))}
      </select>
      {error && touched ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default Select;
