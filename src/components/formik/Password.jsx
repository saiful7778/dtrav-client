"use client";
import { useId, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import PropTypes from "prop-types";
import { useField } from "formik";
import { Icon, Input, Label } from "keep-react";

const Password = ({ placeholder, label, disabled, name }) => {
  const [showPass, setShowPass] = useState(false);
  const [field, { error, touched }] = useField({ name });
  const inputId = useId();

  return (
    <div>
      <fieldset className="space-y-1">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="relative">
          <Input
            id={inputId}
            type={showPass ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={50}
            className="border-gray-400 p-0 ps-11 placeholder:text-gray-400 focus-visible:ring-gray-600"
            {...field}
          />
          <Icon className="text-gray-600">
            <FaLock size={19} />
          </Icon>
          <button
            onClick={() => setShowPass((l) => !l)}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 p-2 text-gray-500"
            type="button"
          >
            {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </button>
        </div>
      </fieldset>
      {error && touched ? (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

Password.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  icon: PropTypes.node,
};

export default Password;
