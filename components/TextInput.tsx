import clsx from "clsx";

const TextInput = () => {
  return (
    <input
      type="text"
      className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      placeholder="Enter your text..."
    />
  );
};

export default TextInput;
