// needs to mark as client component because we useState here
"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "react-feather";

interface DropdownProps<Option> {
  options: readonly Option[];
  onOptionSelect: (selectedOption: Option) => void;
  displayedText: any;
  hideCaret?: boolean;
  position?: "left" | "right";
}

const Dropdown = ({
  options,
  onOptionSelect,
  displayedText,
  hideCaret = false,
  position = "left",
}: DropdownProps<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50"
          id="dropdown-menu-button"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {displayedText}
          {!hideCaret && <ChevronDown color="black" />}
        </button>
      </div>

      {isOpen && (
        <div
          className={`z-50 origin-top-right absolute ${
            position === "left" ? "left-0" : "right-0"
          } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-menu-button"
          >
            {options.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
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
