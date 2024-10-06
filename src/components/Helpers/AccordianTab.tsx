// AccordionTab.tsx
import React from "react";

interface AccordionTabProps {
  title: string;
  content: string;
  isActive?: boolean;
  onToggle?: () => void;
}

const AccordionTab: React.FC<AccordionTabProps> = ({
  title,
  content,
  isActive = false,
  onToggle,
}) => {
  return (
    <div>
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 gap-3"
          aria-expanded={isActive}
          onClick={onToggle}
        >
          <span className="font-semibold text-start">{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 ${isActive ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isActive ? "max-h-screen" : "max-h-0"
        }`}
        style={{ maxHeight: isActive ? "500px" : "0px" }}
      >
        <div className="py-5 border-b border-gray-200">
          <p className="text-gray-500">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionTab;
