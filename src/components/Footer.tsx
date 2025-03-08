import isMobileUtil from "@/utils";
import getHref from "@/utils/getHref";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function FooterMobile() {
  return (
    <footer id="footer" className="py-10 px-5 bg-[#F2F2F2]">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">+998 94 440 44 40</span>
        <span className="text-2xl font-bold">familypark@gmail.com</span>
        <div className="mt-4 flex gap-3 items-center">
          <img src="/icons/clock.svg" alt="" />
          <span>Пн-Вс с 10:00 до 23:00 </span>
        </div>
      </div>
      <div className="mt-10 mb-7">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Социальные сети</h3>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/instagram.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Instagram</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/telegram.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Telegram</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/tiktok.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Tik Tok</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/facebook.svg"
                alt="instagram-icon"
                className="h-6 w-6"
              />
              <span>Facebook</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/youtube.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Youtube</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg">Правила</h3>
            <span>Правила посетителя</span>
            <span>Правила парковки</span>
            <span>Правила размещения рекламы</span>
          </div>
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
  const additionalLinks = [
    {
      id: 1,
      text: t("header.links.visitors-rules"),
      href: getHref("/faq"),
    },
    {
      id: 2,
      text: t("header.links.parking-rules"),
      href: getHref("/faq"),
    },
    {
      id: 3,
      text: t("header.links.advertising-rules"),
      href: getHref("/faq"),
    },
    { id: 4, text: t("header.links.faq"), href: getHref("/faq") },
  ];

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
            <img src="/icons/clock.svg" alt="" />
            <span>Пн-Вс с 10:00 до 23:00 </span>
          </div>
        </div>
        <div className="ml-20">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-lg">Социальные сети</h3>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/instagram.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Instagram</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/telegram.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Telegram</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/tiktok.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Tik Tok</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/facebook.svg"
                  alt="instagram-icon"
                  className="h-6 w-6"
                />
                <span>Facebook</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/youtube.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Youtube</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Правила</h3>
          {additionalLinks.map((link) => (
            <Link key={link.id} to={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
      <img
        className="w-300 h-30 transform scale-150 block mt-40"
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
