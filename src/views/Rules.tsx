import StaticHeaderBlack from "@/components/header/StaticHeaderBlack";
import { useHttp } from "@/hooks/useHttp";
import { RulesType } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const TIME_SHOW_MODAL = 3000;

const Rules = () => {
  const { ruleName } = useParams<{ruleName: string}>()
  const [rule, setRule] = useState<RulesType>();
  const [errorMessage, setErrorMessage] = useState("");
  const { i18n } = useTranslation();

  const { request, loading } = useHttp();

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      request(`/additional/rules/${ruleName}`, "GET")
        .then((res: RulesType) => setRule(res))
        .catch(() => {
          setErrorMessage(
            "Произошла непредвиденная ошибка. Перезагрузите страницу."
          );
          setTimeout(() => {
            setErrorMessage("");
          }, TIME_SHOW_MODAL);
        });
    }
  }, [ruleName]);

  const getTitle = () => {
    if (!rule) return "";
    return i18n.language === "ru"
      ? rule.title_ru
      : i18n.language === "uz"
      ? rule.title_uz
      : rule.title_en;
  };

  const getDescription = () => {
    if (!rule) return "";
    return i18n.language === "ru"
      ? rule.description_ru
      : i18n.language === "uz"
      ? rule.description_uz
      : rule.description_en;
  };


  return (
    <div className="mt-30 mb-10 _container">
      <StaticHeaderBlack />
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <ClipLoader color="#3498db" size={50} />
        </div>
      ) : rule ? (
        <div>
          <h1 className="text-3xl font-bold text-center">{getTitle()}</h1>
          <div className="mt-5 w-full h-full flex gap-5 flex-col" dangerouslySetInnerHTML={{ __html: getDescription() }} />
        </div>
      ) : null}
      {errorMessage && (
        <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Rules;
