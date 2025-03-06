import { useState } from "react";
import Button from "./Button";

interface Props {
  title?: string;
  className?: string;
  initialState?: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children, className, initialState }: Props) => {
  const [isOpen, setIsOpen] = useState(initialState == 'open');

  return (
    <div
      className={`accordion mt-5 py-7 bg-gradient-to-br from-[#CECFEE] to=[#FFF] backdrop-blur-xl shadow-md shadow-black rounded-4xl md:px-5 ${className}`}
    >
      <div className="flex items-center justify-between px-3">
        <h2 className="text-3xl font-black uppercase drop-shadow-2xl bg-gradient-to-br from-[#6A6DBD] to-[#25254C] text-transparent bg-clip-text">
          {title || ""}
        </h2>
        <Button
          className="px-2.5! py-3! min-h-10 min-w-10"
          bg="blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className={`w-full h-full transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            src="/icons/cinemaArrowDown.png"
            alt="cinema-arrow-down"
          />
        </Button>
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
