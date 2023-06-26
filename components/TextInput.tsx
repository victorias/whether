import clsx from "clsx";
import { useState } from "react";

interface TextInputProps {
  placeholder: string;
  initialValue: string;
  onBlur?: (value: string) => void;
  onKeyPressEnter?: (value: string) => void;
}

const TextInput = ({
  placeholder,
  initialValue = "",
  onBlur,
  onKeyPressEnter,
}: TextInputProps) => {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      type="text"
      className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        event.preventDefault();
        setValue(event.target.value);
      }}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onKeyPressEnter && onKeyPressEnter(value);
        }
      }}
      onBlur={() => onBlur && onBlur(value)}
    />
  );
};

export default TextInput;
