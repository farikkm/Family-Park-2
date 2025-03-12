import { AnimatePresence } from "motion/react";
import Transitionable from "../ui/Transitionable";
import { Link } from "react-router-dom";
import SearchInput from "./components/SearchInput";
import { useEffect, useRef, useState } from "react";
import Locales from "./components/Locales";
import Modal from "./components/Modal";
import { SocialMediaIcons } from "../ui/SocialMediaIcons";
import {handleEnter, showInput} from "./animations";

const StaticHeader = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const openMenu = () => {
    document.body.classList.add("lock");
    setIsShowModal(true);
  };

  const openSearchInputRef = () => showInput(searchInputRef.current);

  // ===== Плавное открытие/закрытие поля input для поиска ===== //
  useEffect(() => {
    const input = searchInputRef.current;
    if (!input) return;

    input.addEventListener("keydown", (e) => handleEnter(e, input));
    return () => input.removeEventListener("keydown", (e) => handleEnter(e, input));
  }, [searchInputRef.current]);

  return (
    <>
      <header
        className={`header backdrop-blur-xs fixed top-0 left-0 z-5 w-full px-10 pt-4 md:pt-7 bg-transparent`}
      >
        <div className="flex justify-between items-center">
          {/* ========================= LEFT-SIDE ============================ */}
          <div className="flex items-center gap-10">
            {/* ========================= LOCALES ============================ */}
            <div
              className={`hidden md:flex gap-2 items-center *:cursor-pointer text-white`}
            >
              <Locales />
            </div>
            {/* ========================= SEARCH-INPUT ============================ */}
            <form id="header-search" className="flex items-center relative">
              <Transitionable >
                <div onClick={openSearchInputRef} className="flex items-center">
                  <img
                    className="h-[25px]"
                    src="/icons/header/searchWhite.svg"
                    alt="search-icon"
                  />
                </div>
              </Transitionable>

              <SearchInput ref={searchInputRef} color="white" />
            </form>
          </div>
          {/* ========================= HEADER-LOGO ============================ */}
          <AnimatePresence mode="wait">
            <Transitionable rotatable>
              <Link to="/">
                <img
                  className="w-25"
                  src="/logo/headerLogoWhite.png"
                  alt="header-logo"
                />
              </Link>
            </Transitionable>
          </AnimatePresence>
          {/* ========================= RIGHT-SIDE ============================ */}
          <div className="flex items-center gap-24">
            {/* ========================= SOCIAL-MEDIA ============================ */}
            <AnimatePresence mode="wait">
              <Transitionable className="hidden mt-3 md:flex items-center gap-5 *:w-8 *:h-8 *:cursor-pointer">
                <SocialMediaIcons color="white" />
              </Transitionable>
            </AnimatePresence>
            {/* ========================= MENU-ICON ============================ */}
            <Transitionable onClick={openMenu} className="mt-2 p-1">
              <img src="/icons/header/menuWhite.svg" alt="menu-icon" />
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
};

export default StaticHeader;
