import { forwardRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, color, ...props }, ref) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

    // Определяем текущий язык из пути (например, /ru, /en)
    const currentLang = location.pathname.split("/")[1] || "ru";

    const handleSearch = async () => {
      if (!searchQuery.trim()) return;

      setLoading(true);

      try {
        const response = await fetch(`${apiBaseUrl}/tenats/tenats?search=${searchQuery}`);
        const data = await response.json();

        if (response.ok) {
          
          navigate(`/${currentLang}/search`, { state: { results: data } });
        } else {
          console.error("Search failed:", data);
        }
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`w-0 opacity-0 p-2 border-b-2 ${
          color === "white"
            ? "border-b-white placeholder:text-white text-white"
            : ""
        } outline-0 transition-all duration-300 ease-in-out ${className || ""}`}
        placeholder={loading ? t("header.loading") : `${t("header.searchInput")}...`}
        disabled={loading}
        {...props}
      />
    );
  }
);

export default SearchInput;
