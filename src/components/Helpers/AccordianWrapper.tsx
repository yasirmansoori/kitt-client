import React, { useState, cloneElement } from "react";

interface AccordionChildProps {
  isActive: boolean;
  onToggle: () => void;
}

interface AccordionWrapperProps {
  children:
    | React.ReactElement<AccordionChildProps>
    | React.ReactElement<AccordionChildProps>[];
}

const AccordionWrapper: React.FC<AccordionWrapperProps> = ({ children }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveTabIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white text-gray-900"
      data-inactive-classes="text-gray-500"
      className="mb-10 mx-4 sm:mx-0"
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? cloneElement(child, {
              isActive: index === activeTabIndex,
              onToggle: () => handleToggle(index),
            })
          : child
      )}
    </div>
  );
};

export default AccordionWrapper;
