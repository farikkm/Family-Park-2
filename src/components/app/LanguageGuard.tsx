import { config } from "@/config";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const { supportedLanguages } = config;

function LanguageGuard({ setLangKey }: { setLangKey: (lng: string) => void; }) {
  const { lng } = useParams<{ lng: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation()

  // При вводе не существующего языка.
  useEffect(() => {
    const currentLanguage = lng || "";
    const page = location.pathname.replace(/^\/[^/]+\//, "");    

    if (!supportedLanguages.includes(currentLanguage)) {
      navigate(
        `/${i18n.language}/${page}`,
        { replace: true }
      );
    }
  }, [lng, navigate]);

  // При изменении языка страницы.
  useEffect(() => {
    const page = location.pathname.replace(/^\/[^/]+\//, "")

    const onLanguageChange = (newLng: string) => {
      if (supportedLanguages.includes(newLng) && newLng !== lng) {
        const newPath = `/${newLng}/${page}`;
        navigate(newPath, { replace: true });
        setLangKey(newLng); 
      }
    };

    i18n.on("languageChanged", onLanguageChange);
    return () => {
      i18n.off("languageChanged", onLanguageChange);
    };
  }, [lng, navigate]);

  return <Outlet />;
}

export default LanguageGuard;
