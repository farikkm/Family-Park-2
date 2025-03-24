import isMobileUtil from "@/utils/isMobile";
import { useTranslation } from "react-i18next";
import AdditionalLinks from "./AdditionalLinks";
import { SocialMediaIconsRow } from "../ui/SocialMediaIcons";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { RulesType } from "@/types";
import ModalRules from "../header/components/ModalRules";

function FooterMobile() {
  const [rules, setRules] = useState<RulesType[]>([]);
  const { request } = useHttp();

  useEffect(() => {
    request("/additional/rules/", "GET", null).then((res: RulesType[]) =>
      setRules(res)
    );
  }, []);

  return (
    <footer id="footer" className="py-10 px-5 bg-[#F2F2F2]">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">+998 94 440 44 40</span>
        <span className="text-2xl font-bold">familypark@gmail.com</span>
        <div className="mt-4 flex gap-3 items-center">
          <img src="/icons/footer/clock.svg" alt="" />
          <span>Пн-Вс с 10:00 до 23:00 </span>
        </div>
      </div>
      <div className="mt-10 mb-7">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Социальные сети</h3>
            <SocialMediaIconsRow />
          </div>
          {rules && (
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-lg">Правила</h3>
              <ModalRules rules={rules} />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src="/logo/footerLogo.svg" alt="footer-logo" />
      </div>
    </footer>
  );
}

function FooterDesktop() {
  const { t } = useTranslation();

  const [rules, setRules] = useState<RulesType[]>([]);
  const { request } = useHttp();

  useEffect(() => {
    request("/additional/rules/", "GET", null).then((res: RulesType[]) =>
      setRules(res)
    );
  }, []);

  return (
    <footer
      id="footer"
      className="py-10 px-5 bg-[#F2F2F2] pt-40 h-screen items-start *:w-full"
    >
      <div className="grid grid-cols-4">
        <div className="flex flex-col items-center justify-center">
          <img src="/logo/footerLogo.svg" alt="footer-logo" />
          <h3 className="mt-10 text-2xl text-center">{t("footer.title")}</h3>
        </div>
        <div className="flex flex-col ml-5">
          <span className="text-2xl font-bold">+998 94 440 44 40</span>
          <span className="text-2xl font-bold">familypark@gmail.com</span>
          <div className="mt-4 flex gap-3 items-center">
            <img src="/icons/footer/clock.svg" alt="" />
            <span>{t("footer.working_hours")}</span>
          </div>
        </div>
        <div className="ml-20">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-lg">{t("footer.social_media")}</h3>
              <SocialMediaIconsRow />
            </div>
          </div>
        </div>
        {rules && (
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg">{t("footer.terms")}</h3>
            <ModalRules rules={rules} />
          </div>
        )}
      </div>
      <img
        className="w-300 h-30 transform scale-150 block mt-20"
        src="/logo/footerLogo.svg"
        alt=""
      />
    </footer>
  );
}

export default function Footer() {
  let isMobile = isMobileUtil();

  if (isMobile) {
    return <FooterMobile />;
  } else {
    return <FooterDesktop />;
  }
}
