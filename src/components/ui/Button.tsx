import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bg?: string;
  className?: string;
  children: React.ReactNode;
}


const Button: React.FC<ButtonProps> = ({ bg = "red", className = "", children, ...props }) => {
    return (
      <button
        className={`button py-3 px-8 uppercase text-white text-[11px] rounded-4xl transition-transform duration-200 ${className} ${bg === 'red' ? 'bg-[#FA557B]' : 'bg-[#2C2D58]'}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  