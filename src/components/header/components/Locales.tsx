import { useTranslation } from "react-i18next";

const locales = {
  ru: { title: "RU" },
  en: { title: "EN" },
  uz: { title: "UZ" },
};

const Locales = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {Object.keys(locales).map((locale) => (
        <span
          key={locale}
          className={`font-bold text-lg ${
            i18n.resolvedLanguage === locale ? "text-[#7878FF]" : ""
          }`}
          onClick={() => {
            document.body.classList.remove("lock");
            i18n.changeLanguage(locale);
          }}
        >
          {locales[locale as keyof typeof locales].title}
        </span>
      ))}
    </>
  );
};

export default Locales;