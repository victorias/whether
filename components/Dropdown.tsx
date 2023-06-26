// needs to mark as client component because we useState here
"use client";
import { useState } from "react";

type Option = string;

interface DropdownProps {
  options: Option[];
  onOptionSelect: (selectedOption: Option) => void;
  selectedOption: Option;
}

const Dropdown = ({
  options,
  onOptionSelect,
  selectedOption,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="dropdown-menu-button"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedOption}
          {/* @TODO: replace this icon */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.293 14.95a1 1 0 01-1.414 0l-4.243-4.243A1 1 0 114.95 8.05l3.536 3.536 3.536-3.536a1 1 0 111.414 1.414l-4.243 4.243z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-menu-button"
          >
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
