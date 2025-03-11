import { useTranslation } from "react-i18next";
import SendButton from "../ui/SendButton";
import WeekSchedule from "./WorkingHours";

const TenantForm = () => {
  const { t } = useTranslation();

  const tenantTypes = t("tenant.types", {
    returnObjects: true,
  }) as Record<string, string>;
  return (
    <form
      id="tenant-input"
      className="w-full max-w-[800px] p-4 md:p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
      action="#"
    >
      <div>
        <div>
          <h3 className="uppercase text-lg font-bold mb-2">
            {t("tenant-input.title1")}
          </h3>
          <label className="flex flex-col mb-3" htmlFor="first-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.trade-profile")}
            </span>
            <select
              required
              className="*:font-thin py-2 border-b"
              id="first-label"
            >
              {Object.entries(tenantTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col mb-3" htmlFor="second-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.desired-area")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              id="second-label"
            />
          </label>
          <label className="flex flex-col mb-3" htmlFor="third-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.company-name")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              id="third-label"
            />
          </label>
          <label className="flex flex-col mb-3" htmlFor="fourth-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.short-description")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              id="fourth-label"
            />
          </label>
          <label className="flex flex-col mb-3" htmlFor="fifth-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.content")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              id="fifth-label"
            />
          </label>
          <WeekSchedule />
        </div>
        <div>
          <h3 className="uppercase text-lg font-bold mb-2">
            {t("tenant-input.title2")}
          </h3>
          <label className="flex flex-col mb-3" htmlFor="fourth-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column2.contact")}
            </span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              id="fourth-label"
            />
          </label>
          <label className="flex flex-col mb-3" htmlFor="fifth-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column2.mail")}
            </span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              id="fifth-label"
            />
          </label>
          <label className="flex flex-col mb-3" htmlFor="sixth-label">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column2.phone")}
            </span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              id="sixth-label"
              placeholder="+998 __ ___ __ __"
            />
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <SendButton />
        </div>
      </div>
    </form>
  );
};

export default TenantForm;
