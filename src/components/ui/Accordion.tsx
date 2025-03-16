import { useState } from "react";
import IconButton from "./IconButton";

interface Props {
  title?: string;
  className?: string;
  initialState?: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children, className, initialState }: Props) => {
  const [isOpen, setIsOpen] = useState(initialState == "open");

  return (
    <div
      className={`accordion mt-5 py-7 gray-gradient backdrop-blur-xl shadow-[0_3px_10px_rgba(0,0,0,0.5)] rounded-4xl md:px-5 ${className}`}
    >
      <div className="flex items-center justify-between px-3">
        <h2 className="text-3xl font-black uppercase drop-shadow-2xl blue-gradient text-transparent bg-clip-text">
          {title || ""}
        </h2>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            src="/icons/navigation/accordionArrowDown.svg"
            alt="cinema-arrow-down"
          />
        </IconButton>
      </div>
      <div
        className={`accordion-content transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "max-h-[300px] overflow-auto" : "max-h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
