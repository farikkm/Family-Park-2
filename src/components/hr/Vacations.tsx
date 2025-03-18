import { useEffect, useState } from "react";
import Accordion from "../ui/Accordion";
import { useTranslation } from "react-i18next";
import { useHttp } from "@/hooks/useHttp";

interface VacanciesType {
  id: number;
  name_vacations: string;
  description_vacations: string;
  wages: number;
  status: boolean;
  category_vacations: number;
}

const Vacations = ({ category_vacations }: { category_vacations: number }) => {
  const { t, i18n } = useTranslation();
  const [vacancies, setVacancies] = useState<VacanciesType[]>([]);

  const { request } = useHttp();

  useEffect(() => {
    request("/vacations/", "GET", null, {
      "Accept-Language": `${i18n.resolvedLanguage}`,
    }).then((res) => setVacancies(res));
  }, []);

  return (
    <div>
      <Accordion className="mt-6!" title={ category_vacations === 1 ? t("hr.tenants_vacancies.title") :t("hr.family_park_vacancies.title") } initialState="open">
        <div className="mt-7 flex flex-col gap-5 px-5">
          {vacancies
            .filter(
              (vacancie) => vacancie.category_vacations === category_vacations
            )
            .map((vacancie) => (
              <div
                key={vacancie.id}
                className="flex gap-5 items-center border-b last:border-b-0 border-b-[#888888] pb-3"
              >
                <div className="red-gradient p-3 min-w-14 rounded-4xl">
                  <img src="/icons/hr/smile.svg" alt="smile-icon" />
                </div>
                <div className="flex flex-col">
                  <strong className="text-black text-lg">
                    {vacancie.name_vacations}
                  </strong>
                  <span className="text-xs">
                    {vacancie.description_vacations}
                  </span>
                </div>
                <div>
                  <strong>{vacancie.wages}$</strong>
                </div>
              </div>
            ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Vacations;
