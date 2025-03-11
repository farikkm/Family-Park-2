import getHref from "@/utils/getHref";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AdditionalLinks = () => {
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
    <>
      {additionalLinks.map((link) => (
        <Link key={link.id} to={link.href}>
          {link.text}
        </Link>
      ))}
    </>
  );
};

export default AdditionalLinks;
