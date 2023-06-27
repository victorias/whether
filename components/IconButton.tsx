import { ReactNode } from "react";

const IconButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-transparent p-2 text-white hover:text-gray-500 hover:bg-gray-100 hover:border-gray-100 transition duration-300"
    >
      {children}
    </button>
  );
};

export default IconButton;
