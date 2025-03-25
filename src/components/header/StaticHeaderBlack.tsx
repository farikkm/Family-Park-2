import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Transitionable from "@/components/ui/Transitionable";
import SearchInput from "@/components/header/components/SearchInput";
import { SocialMediaIcons } from "../ui/SocialMediaIcons";
import Modal from "./components/Modal";
import Locales from "./components/Locales";
import {handleEnter, showInput} from "./animations";

const StaticHeaderBlack = () => {
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
      {/* //! ======================================================= HEADER =======================================================*/}

      <header
        className={`header backdrop-blur-xs fixed top-0 left-0 z-5 w-full px-10 pt-4 md:pt-7 bg-transparent`}
      >
        <div className="flex justify-between items-center">
          {/* ========================= LEFT-SIDE ============================ */}
          <div className="flex items-center gap-10">
            {/* ========================= LOCALES ============================ */}
            <div
              className={`hidden md:flex gap-2 items-center *:cursor-pointer text-black`}
            >
              <Locales />
            </div>
            {/* ========================= SEARCH-INPUT ============================ */}
            <form id="header-search" className="flex items-center relative">
              <Transitionable onClick={openSearchInputRef}>
                <img
                  className="h-full"
                  src="/icons/header/search.svg"
                  alt="search-icon"
                />
              </Transitionable>

              <SearchInput ref={searchInputRef} color="black" />
            </form>
          </div>
          {/* ========================= HEADER-LOGO ============================ */}
          <AnimatePresence mode="wait">
            <Transitionable rotatable>
              <Link to="/">
                <img src="/logo/logo.svg" alt="header-logo" />
              </Link>
            </Transitionable>
          </AnimatePresence>
          {/* ========================= RIGHT-SIDE ============================ */}
          <div className="flex items-center gap-24">
            {/* ========================= SOCIAL-MEDIA ============================ */}
            <AnimatePresence mode="wait">
              <Transitionable className="hidden mt-3 md:flex items-center gap-4 *:w-8 *:h-8 *:cursor-pointer">
                <SocialMediaIcons color="normal" />
              </Transitionable>
            </AnimatePresence>
            {/* ========================= MENU-ICON ============================ */}
            <Transitionable onClick={openMenu} className="mt-2 p-1">
              <img src="/icons/header/menu-icon.svg" alt="menu-icon" />
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

export default StaticHeaderBlack;
