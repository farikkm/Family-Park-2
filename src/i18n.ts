import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend'
import LanguageDetector from "i18next-browser-languagedetector";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "ru", // Убедись, что это соответствует папке в `public/locales`
    lng: "ru", // Можно динамически менять
    debug: true, // Включи для отладки
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Убедись, что путь верный
    },
  });

export default i18n;
