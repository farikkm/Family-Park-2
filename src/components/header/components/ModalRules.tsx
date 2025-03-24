import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

const getHref = (path: string, lng: string) => {
  const url = new URL(path, window.location.origin);
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] === lng) {
    segments.shift(); // Убираем дублирующийся язык
  }

  return `/${lng}/${segments.join("/")}`;
};

const ModalRules = ({ rules, closeMenu }: { rules: RulesType[], closeMenu?: () => void }) => {
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-3 *:cursor-pointer">
      {rules.map((rule) => (
        <Link
          key={rule.id}
          to={getHref(`rule/${rule.slug}`, i18n.language)}
          onClick={closeMenu}
          state={rule}
        >
          {i18n.language === "ru"
            ? rule.title_ru
            : i18n.language === "uz"
            ? rule.title_uz
            : rule.title_en}
        </Link>
      ))}
    </div>
  );
};

export default ModalRules;
