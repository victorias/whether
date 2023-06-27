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
      className="appearance-none py-2 px-4 focus:outline-none text-lg flex w-full font-bold hover:bg-gray-50 focus:bg-gray-50"
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
