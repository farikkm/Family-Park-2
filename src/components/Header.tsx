import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Transitionable from "@/components/ui/Transitionable";
import SearchInput from "@/components/header/SearchInput";

const showInput = (elem: HTMLInputElement | null) => {
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
};

const Header = ({
  icons = "normal",
  className,
}: {
  icons?: string;
  className?: string;
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [iconState, setIconState] = useState(false);

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
  useEffect(() => {
    const handleStorageChange = () => {
      const swiperIndex = Number(localStorage.getItem("swiperIndex")) || 0;
      const isHomePage = window.location.pathname === "/";
      if (
        !(window.innerHeight < 700 || window.innerWidth < 768) &&
        isHomePage
      ) {
        setIconState([1, 2, 3, 4, 5, 6, 7].includes(swiperIndex));
      }
    };

    handleStorageChange();

    const interval = setInterval(handleStorageChange, 500);
    return () => clearInterval(interval);
  }, []);

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
      {/* ======================================================= HEADER =======================================================*/}

      <header
        className={`header backdrop-blur-xs fixed top-0 left-0 z-5 w-full px-10 py-7 pb-0 ${
          icons === "white" ? "bg-transparent" : "bg-white"
        } ${className}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div
              className={`hidden md:flex gap-2 items-center *:cursor-pointer ${
                iconState || icons === "white" ? "text-white" : "text-black"
              }`}
            >
              <span className="font-bold text-lg text-[#7878FF]">RU</span>
              <span className="font-bold text-lg">EN</span>
              <span className="font-bold text-lg">UZ</span>
            </div>
            <div>
              <form id="header-search" className="flex items-center relative">
                <Transitionable
                  key={iconState.toString()}
                  onClick={openSearchInputRef}
                >
                  {iconState || icons === "white" ? (
                    <div className="flex items-center">
                      <img
                        className="h-[25px]"
                        src="/icons/searchWhite.svg"
                        alt="search-icon"
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        className="h-full"
                        src="/icons/search.svg"
                        alt="search-icon"
                      />
                    </>
                  )}
                </Transitionable>

                {iconState || icons === "white" ? (
                  <SearchInput ref={searchInputRef} color="white" />
                ) : (
                  <SearchInput ref={searchInputRef} color="black" />
                )}
              </form>
            </div>
          </div>
          <Link to="/">
            <AnimatePresence mode="wait">
              <Transitionable
                key={iconState.toString()}
                rotatable
              >
                {iconState || icons === "white" ? (
                  <img
                    className="w-25"
                    src="/headerLogoWhite.png"
                    alt="header-logo"
                  />
                ) : (
                  <img src="/headerLogo.png" alt="header-logo" />
                )}
              </Transitionable>
            </AnimatePresence>
          </Link>
          <div className="flex items-center gap-24">
            <AnimatePresence mode="wait">
              <Transitionable
                key={iconState.toString()}
                className="hidden mt-3 md:flex items-center gap-5 *:w-8 *:h-8 *:cursor-pointer"
              >
                {iconState || icons === "white" ? (
                  <>
                    <img src="/icons/white/Vector.svg" alt="instagram-icon" />
                    <img src="/icons/white/Vector(1).svg" alt="telegram-icon" />
                    <img
                      className="h-10! w-10!"
                      src="/icons/white/youtube.svg"
                      alt="youtube-icon"
                    />
                    <img src="/icons/white/Vector(2).svg" alt="facebook-icon" />
                    <img
                      className="h-10! w-10! mt-1"
                      src="/icons/white/Vector(3).svg"
                      alt="tiktok-icon"
                    />
                  </>
                ) : (
                  <>
                    <img src="/icons/instagram.svg" alt="instagram-icon" />
                    <img src="/icons/telegram.svg" alt="telegram-icon" />
                    <img src="/icons/youtube.svg" alt="youtube-icon" />
                    <img src="/icons/facebook.svg" alt="facebook-icon" />
                    <img src="/icons/tiktok.svg" alt="tiktok-icon" />
                  </>
                )}
              </Transitionable>
            </AnimatePresence>

            <Transitionable
              key={iconState.toString()}
              onClick={openMenu}
              className="mt-2 p-1"
            >
              {iconState || icons === "white" ? (
                <img src="/icons/menuWhite.svg" alt="menu-icon" />
              ) : (
                <img src="/icons/menu-icon.svg" alt="menu-icon" />
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
};

const Modal = ({
  setIsShowModal,
}: {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modal = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const closeMenu = () => {
    document.body.classList.remove("lock");
    setIsShowModal(false);
  };

  const openSearchInputRef = () => showInput(searchInputRef.current);

  // Close menu when press the 'Exit' key
  useEffect(() => {
    const closeMenuOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.classList.remove("lock");
        setIsShowModal(false);
      }
    };
    window.addEventListener("keydown", (e) => closeMenuOnEscape(e));
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, []);

  // Send searching info when press the 'Enter' key
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
    <AnimatePresence>
      <motion.div
        ref={modal}
        className="modal fixed top-0 left-0 z-10 h-full w-full bg-transparent overflow-y-scroll"
        initial={{ opacity: 0, left: 10 }}
        animate={{ opacity: 1, left: 0 }}
        exit={{ opacity: 0, left: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* ========================= HEADING ============================ */}
        <div className="modal__heading px-10 py-7 pb-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-10">
              <div className="hidden md:flex gap-2 items-center *:cursor-pointer">
                <span className="font-bold text-lg text-[#7878FF]">RU</span>
                <span className="font-bold text-lg">EN</span>
                <span className="font-bold text-lg">UZ</span>
              </div>
              <form id="modal-search" className="flex items-center relative">
                <img
                  className="cursor-pointer h-8 md:h-6"
                  src="/icons/search.svg"
                  alt="search-icon"
                  onClick={openSearchInputRef}
                />
                <SearchInput ref={searchInputRef} color="black" />
              </form>
            </div>
            <button onClick={() => closeMenu()}>
              <Transitionable rotatable>
                <img src="/headerLogo.png" alt="header-logo" />
              </Transitionable>
            </button>
            <img
              onClick={closeMenu}
              className="cursor-pointer h-10"
              src="/icons/close.svg"
              alt="close-icon"
            />
          </div>
        </div>
        {/* ========================= CONTENT ============================ */}
        <div className="modal__bottom p-5 md:flex md:flex-row-reverse md:gap-4 md:items-end md:justify-center">
          <div className="md:w-full">
            {/* ========================= LANGUAGES ============================ */}
            <div className="*:mr-2 md:hidden">
              <span className="font-bold text-lg text-[#7878FF]">RU</span>
              <span className="font-bold text-lg">EN</span>
              <span className="font-bold text-lg">UZ</span>
            </div>
            {/* ========================= LINKS ============================ */}
            <div className="header-menu-links inline-flex flex-col gap-5 text-[#25254C] *:text-3xl *:cursor-pointer mt-5 italic font-bold md:not-italic md:*:text-4xl">
              <Link to="/catalog" onClick={closeMenu}>
                Концерты и события
              </Link>
              <Link to="/map" onClick={closeMenu}>
                Карта ТРЦ
              </Link>
              <Link to="/catalog" onClick={closeMenu}>
                Магазины
              </Link>
              <Link to="/catalog" onClick={closeMenu}>
                Еда
              </Link>
              <Link to="/catalog" onClick={closeMenu}>
                Развлечения и услуги
              </Link>
              <Link to="/catalog" onClick={closeMenu}>
                Акции и скидки
              </Link>
              <Link to="/tenant" onClick={closeMenu}>
                Арендаторам
              </Link>
            </div>
            {/* ========================= BOTTOM-LINKS ============================ */}
            <div className="mt-10 flex flex-col gap-3 *:text-3xl text-[#C83053] font-bold *:cursor-pointer">
              <Link to='/hr' onClick={closeMenu}>Работа в Family Park</Link>
              <Link to='/lost-item' onClick={closeMenu}>Потерянные вещи</Link>
            </div>
            <div className="mt-5 flex flex-col gap-3 *:cursor-pointer">
              <span>Правила посетителя</span>
              <span>Правила парковки</span>
              <span>Правила размещения рекламы</span>
            </div>
          </div>
          {/* ========================= ADDITIONAL INFO  ============================ */}
          <div className="mt-10 flex flex-col gap-4 *:text-[#25254C] md:ml-10 md:w-[80%]">
            <div className="flex items-center gap-3">
              <img src="/icons/gmail.svg" alt="gmail-icon" />
              <span className="font-bold text-base text-[#BB2649]">
                familypark@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/icons/phone.svg" alt="phone-icon" />
              <span className="text-3xl font-bold">+998 94 440 44 40</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/icons/location.svg" alt="location-icon" />
              <span className="text-3xl font-bold">
                Узбекистан, г.Самарканд <br /> ул. Нарпайская 76а
              </span>
            </div>
            {/* ========================= ICONS ============================ */}
            <div className="mt-3 flex items-center gap-5 *:w-8 *:h-8 *:cursor-pointer">
              <img src="/icons/instagram.svg" alt="instagram-icon" />
              <img src="/icons/telegram.svg" alt="telegram-icon" />
              <img src="/icons/youtube.svg" alt="youtube-icon" />
              <img src="/icons/facebook.svg" alt="facebook-icon" />
              <img src="/icons/tiktok.svg" alt="tiktok-icon" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Header;
