import { useField } from "formik";
import { Icon, Input, Label } from "keep-react";
import PropTypes from "prop-types";
import { useId } from "react";

const InputComp = ({ placeholder, type, icon, name, label, disabled }) => {
  const [field, { error, touched }] = useField({ name });
  const inputId = useId();

  return (
    <div>
      <fieldset className="space-y-1">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="relative">
          <Input
            id={inputId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={50}
            className="border-gray-400 p-0 ps-11 placeholder:text-gray-400 focus-visible:ring-gray-600"
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

InputComp.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

export { InputComp as Input };
