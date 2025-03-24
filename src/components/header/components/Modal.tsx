import getHref from "@/utils/getHref";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import Locales from "./Locales";
import Transitionable from "@/components/ui/Transitionable";
import { Link } from "react-router-dom";
import { SocialMediaIcons } from "@/components/ui/SocialMediaIcons";
import LINKS from "@/utils/links";
import { useHttp } from "@/hooks/useHttp";
import ModalRules from "./ModalRules";

interface RulesType {
  id: number;
  title: string;
  title_ru: string;
  title_en: string;
  title_uz: string;
  description: string;
  description_ru: string;
  description_en: string;
  description_uz: string;
  slug: string;
}

const TIME_SHOW_MODAL = 3000;

const Modal = ({
  setIsShowModal,
}: {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [rules, setRules] = useState<RulesType[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const modal = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  const { request } = useHttp();

  const links = [
    { id: 1, text: t("header.links.concerts"), href: getHref("/events") },
    { id: 2, text: t("header.links.map"), href: getHref("/map") },
    {
      id: 3,
      text: t("header.links.shops"),
      href: getHref(LINKS.CATEGORY.SHOPS),
    },
    { id: 4, text: t("header.links.food"), href: getHref(LINKS.CATEGORY.FOOD) },
    {
      id: 5,
      text: t("header.links.entertainment"),
      href: getHref(LINKS.CATEGORY.ENTERTAINMENT),
    },
    { id: 7, text: t("header.links.tenant"), href: getHref("/tenant") },
  ];

  const redLinks = [
    { id: 1, text: t("header.links.hr"), href: getHref("/hr") },
    {
      id: 2,
      text: t("header.links.lost-items"),
      href: getHref("/lost-item"),
    },
  ];

  const closeMenu = () => {
    document.body.classList.remove("lock");
    setIsShowModal(false);
  };

  useEffect(() => {
    request("/additional/rules/", "GET", null)
      .then((res: RulesType[]) => setRules(res))
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, []);

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

  return (
    <>
      {rules ? (
        <AnimatePresence>
          <motion.div
            ref={modal}
            className="modal fixed top-0 left-0 z-10 h-full w-full bg-transparent overflow-y-scroll"
            initial={{ opacity: 0, left: 10 }}
            animate={{ opacity: 1, left: 0 }}
            exit={{ opacity: 0, left: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* //! ========================= HEADING ============================ //! */}
            <div className="modal__heading px-10 py-7 pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-10">
                  {/* ========================= LOCALES ============================ */}
                  <div className="hidden md:flex gap-2 items-center *:cursor-pointer">
                    <Locales />
                  </div>
                  {/* ========================= SEARCH-INPUT ============================ */}
                </div>
                {/* ========================= HEADER-LOGO ============================ */}
                <button onClick={() => closeMenu()}>
                  <Transitionable rotatable>
                    <img src="/logo/logo.svg" alt="header-logo" />
                  </Transitionable>
                </button>
                {/* ========================= CLOSE-ICON ============================ */}
                <img
                  onClick={closeMenu}
                  className="cursor-pointer h-10"
                  src="/icons/header/close.svg"
                  alt="close-icon"
                />
              </div>
            </div>
            {/* //! ========================= CONTENT ============================ //! */}
            <div className="modal__bottom p-5 md:flex md:flex-row-reverse md:gap-4 md:items-end md:justify-center">
              <div className="md:w-full">
                {/* ========================= LANGUAGES ============================ */}
                <div className="*:mr-2 md:hidden">
                  <Locales />
                </div>
                {/* ========================= LINKS ============================ */}
                <div className="header-menu-links inline-flex flex-col gap-5 text-[#25254C] *:text-3xl *:cursor-pointer mt-5 italic font-bold md:not-italic md:*:text-4xl">
                  {links.map((link) => (
                    <Link key={link.id} to={link.href} onClick={closeMenu}>
                      {link.text}
                    </Link>
                  ))}
                </div>
                {/* ========================= BOTTOM-LINKS ============================ */}
                <div className="mt-10 flex flex-col gap-3 *:text-3xl text-[#C83053] font-bold *:cursor-pointer">
                  {redLinks.map((link) => (
                    <Link key={link.id} to={link.href} onClick={closeMenu}>
                      {link.text}
                    </Link>
                  ))}
                </div>
                {/* ========================= ADDITIONAL-LINKS ============================ */}
                <div className="mt-5 flex flex-col gap-3 *:cursor-pointer">
                  <ModalRules closeMenu={closeMenu} rules={rules} />
                </div>
              </div>
              {/* ========================= ADDITIONAL INFO  ============================ */}
              <div className="mt-10 flex flex-col gap-4 *:text-[#25254C] md:ml-10 md:w-[80%]">
                <div className="flex items-center gap-3">
                  <img src="/icons/header/gmail.svg" alt="gmail-icon" />
                  <span className="font-bold text-base text-[#BB2649]">
                    familypark@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/icons/header/phone.svg" alt="phone-icon" />
                  <span className="text-3xl font-bold">+998 94 440 44 40</span>
                </div>
                <div className="flex items-center gap-3 max-w-[470px]">
                  <img src="/icons/header/location.svg" alt="location-icon" />
                  <span className="text-3xl font-bold">
                    {t("header.location")}
                  </span>
                </div>
                {/* ========================= ICONS ============================ */}
                <div className="mt-3 flex items-center gap-5 *:cursor-pointer">
                  <SocialMediaIcons color="normal" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default Modal;
