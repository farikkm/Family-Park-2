import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, color, ...props }, ref) => {
    const {t} = useTranslation()


    return (
      <input
        ref={ref}
        type="text"
        className={`w-0 opacity-0 p-2 border-b-2 ${
          color == "white"
            ? "border-b-white placeholder:text-white text-white"
            : ""
        } outline-0 transition-all duration-300 ease-in-out focus:w-32 md:focus:w-48 focus:opacity-100 ${
          className || ""
        }`}
        placeholder={`${t("header.searchInput")}...`}
        {...props}
      />
    );
  }
);

export default SearchInput;
