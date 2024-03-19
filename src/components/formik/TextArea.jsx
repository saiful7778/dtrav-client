import { useField } from "formik";
import { Icon, Label, Textarea } from "keep-react";
import { useId } from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, placeholder, disabled, maxLength, icon }) => {
  const [field, { error, touched }] = useField({ name });
  const inputId = useId();

  return (
    <div>
      <fieldset className="space-y-1">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="relative">
          <Textarea
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className="border-gray-400 ps-11 placeholder:text-gray-400 focus-visible:ring-gray-600"
            {...field}
          />
          <Icon className="text-gray-600">{icon}</Icon>
        </div>
      </fieldset>
      {error && touched ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

export default TextArea;
