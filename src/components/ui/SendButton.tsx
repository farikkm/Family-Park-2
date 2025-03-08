import { useTranslation } from "react-i18next";

interface Props {
  className?: string
}

const SendButton = ({ className }: Props) => {
  const { t } = useTranslation();

  return (
    <button className={`uppercase bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold ${className}`}>
      {t("buttons.send")}
    </button>
  );
};

export default SendButton;
