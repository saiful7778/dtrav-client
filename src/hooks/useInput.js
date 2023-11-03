import { useState } from "react";

const useInputValue = (defaultValue) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return { value: inputValue, onChange: handleChange };
};

export default useInputValue;
