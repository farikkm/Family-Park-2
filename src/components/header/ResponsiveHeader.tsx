import { AnimatePresence } from "motion/react";
import Transitionable from "../ui/Transitionable";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import isMobileUtil from "@/utils";
import Locales from "./Locales";
import Modal from "./Modal";
import { SocialMediaIcons } from "../SocialMediaIcons";

const ResponsiveHeader = ({
  className,
}: {
  className?: string;
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [iconState, setIconState] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const isMobile = isMobileUtil();

  const openMenu = () => {
    document.body.classList.add("lock");
    setIsShowModal(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("lock");
    setIsShowModal(false);
  };

  const openSearchInputRef = () => showInput(searchInputRef.current);

  // ===== Белые иконки при переходе к определенный страницам ===== //
  if (!isMobile) {
    useEffect(() => {
      const handleStorageChange = () => {
        const swiperIndex = Number(localStorage.getItem("swiperIndex")) || 0;
        setIconState([1, 2, 3, 4, 5, 6].includes(swiperIndex));
      };

      handleStorageChange();

      const interval = setInterval(handleStorageChange, 500);
      return () => clearInterval(interval);
    }, [location.pathname, i18n.language]);
  }

  // ===== Плавное открытие/закрытие поля input для поиска ===== //
  useEffect(() => {
    const input = searchInputRef.current;
    if (!input) return;

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const searchText = input.value.trim();
        if (searchText) console.log("User input:", searchText);
        input.value = "";
        input.classList.remove("w-48", "opacity-100");
        input.classList.add("w-0", "opacity-0");
        input.blur();
        closeMenu();
      }
    };

    input.addEventListener("keydown", handleEnter);
    return () => input.removeEventListener("keydown", handleEnter);
  }, [searchInputRef.current]);

  return (
    <>
      {/* //! ======================================================= HEADER =======================================================*/}

      <header
        className={`header backdrop-blur-xs fixed top-0 left-0 z-5 w-full px-10 pt-4 md:pt-7 bg-transparent ${className || ""}`}
      >
        <div className="flex justify-between items-center">
          {/* ========================= LEFT-SIDE ============================ */}
          <div className="flex items-center gap-10">
            {/* ========================= LOCALES ============================ */}
            <div
              className={`hidden md:flex gap-2 items-center *:cursor-pointer ${
                iconState ? "text-white" : "text-black"
              }`}
            >
              <Locales />
            </div>
            {/* ========================= SEARCH-INPUT ============================ */}
            <form id="header-search" className="flex items-center relative">
              <Transitionable
                key={iconState.toString()}
                onClick={openSearchInputRef}
              >
                {iconState ? (
                  <div className="flex items-center">
                    <img
                      className="h-[25px]"
                      src="/icons/header/searchWhite.svg"
                      alt="search-icon"
                    />
                  </div>
                ) : (
                  <>
                    <img
                      className="h-full"
                      src="/icons/header/search.svg"
                      alt="search-icon"
                    />
                  </>
                )}
              </Transitionable>

              {iconState ? (
                <SearchInput ref={searchInputRef} color="white" />
              ) : (
                <SearchInput ref={searchInputRef} color="black" />
              )}
            </form>
          </div>
          {/* ========================= HEADER-LOGO ============================ */}
          <AnimatePresence mode="wait">
            <Transitionable key={iconState.toString()} rotatable>
              <Link to="/">
                {iconState ? (
                  <img
                    className="w-25"
                    src="/logo/headerLogoWhite.png"
                    alt="header-logo"
                  />
                ) : (
                  <img src="/logo/headerLogo.png" alt="header-logo" />
                )}
              </Link>
            </Transitionable>
          </AnimatePresence>
          {/* ========================= RIGHT-SIDE ============================ */}
          <div className="flex items-center gap-24">
            {/* ========================= SOCIAL-MEDIA ============================ */}
            <AnimatePresence mode="wait">
              <Transitionable
                key={iconState.toString()}
                className="hidden mt-3 md:flex items-center gap-5 *:w-8 *:h-8 *:cursor-pointer"
              >
                {iconState ? (
                  <SocialMediaIcons color="white" />
                ) : (
                  <SocialMediaIcons color="normal" />
                )}
              </Transitionable>
            </AnimatePresence>
            {/* ========================= MENU-ICON ============================ */}
            <Transitionable
              key={iconState.toString()}
              onClick={openMenu}
              className="mt-2 p-1"
            >
              {iconState ? (
                <img src="/icons/header/menuWhite.svg" alt="menu-icon" />
              ) : (
                <img src="/icons/header/menu-icon.svg" alt="menu-icon" />
              )}
            </Transitionable>
          </div>
        </div>
      </header>

      {/* ======================================================= MODAL =======================================================*/}
      {isShowModal && (
        <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      )}
    </>
  );
}

function showInput(elem: HTMLInputElement | null) {
  if (!elem) return; // Проверка на null

  if (elem.classList.contains("w-0")) {
    elem.classList.remove("w-0", "opacity-0");
    elem.classList.add("md:w-48", "w-32", "opacity-100");
    elem.focus();
  } else {
    elem.classList.remove("md:w-48", "w-32", "opacity-100");
    elem.classList.add("w-0", "opacity-0");
    elem.blur();
  }
}

export default ResponsiveHeader
