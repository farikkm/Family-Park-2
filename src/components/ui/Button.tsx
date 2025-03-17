import React, { LinkHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  path: string
  bg?: string;
  className?: string;
  children: React.ReactNode;
}


const Button: React.FC<LinkProps> = ({ path, bg = "red", className = "", children, ...props }) => {
    return (
      <Link
        to={path}
        className={`w-[150px] h-[60px] px-4 flex justify-center items-center uppercase text-white text-[11px] rounded-4xl transition-transform duration-200 ${className} ${bg === 'red' ? 'bg-[#FA557B]' : 'bg-[#2C2D58]'}`}
        {...props}
      >
        <span className="text-center">{children}</span>
      </Link>
    );
  };
  
  export default Button;
  