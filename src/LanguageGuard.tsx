import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const supportedLanguages = ["ru", "en", "uz"];

function LanguageGuard({ setLangKey }: { setLangKey: (lng: string) => void; }) {
  const { lng } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!supportedLanguages.includes(lng || "")) {
      navigate(
        `/${i18n.language}${location.pathname.replace(/^\/[^/]+/, "")}`,
        { replace: true }
      );
    }
  }, [lng, navigate]);

  useEffect(() => {
    const onLanguageChange = (newLng: string) => {
      if (supportedLanguages.includes(newLng) && newLng !== lng) {
        const newPath = `/${newLng}${location.pathname.replace(
          /^\/[^/]+/,
          ""
        )}`;
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
