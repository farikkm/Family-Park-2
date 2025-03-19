import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  disabled?: boolean;
}

const SendButton = ({ className, disabled }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`uppercase bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold transition 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"} ${className}`}
    >
      {t("buttons.send")}
    </button>
  );
};

export default SendButton;
