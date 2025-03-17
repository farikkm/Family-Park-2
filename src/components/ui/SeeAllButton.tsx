import getHref from "@/utils/getHref";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SeeAllButton = ({link = ""}: { link?: string }) => {
  const {t} = useTranslation()

  return (
    <Link to={getHref(link)} className="see-all">
      { t("buttons.see-all") }
    </Link>
  );
};

export default SeeAllButton;
