import { useTranslation } from "react-i18next";
import SendButton from "../ui/SendButton";
import WeekSchedule from "./WorkingHours";
import { useState } from "react";

interface tenantInfoProps {
  name: string;
  tenant_type: string;
  working_hours: [
    {
      working_day: string;
      working_hours_open: string;
      working_hours_close: string;
    }
  ];
  phone_number: string;
  key_word: string;
  alias: string;
  content: string;
  map_t: string;
}

const tenantInfoModel: tenantInfoProps = {
  name: "",
  tenant_type: "",
  working_hours: [
    {
      working_day: "",
      working_hours_open: "",
      working_hours_close: "",
    },
  ],
  phone_number: "",
  key_word: "",
  alias: "",
  content: "",
  map_t: "",
};

const TenantForm = () => {
  const { t } = useTranslation();
  const [tenantInfo, setTenantInfo] = useState(tenantInfoModel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTenantInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function send(e: React.FormEvent) {
    e.preventDefault();
    console.log(tenantInfo);
  }

  return (
    <form
      id="tenant-input"
      className="w-full max-w-[800px] p-4 md:p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
      action="#"
      onSubmit={send}
    >
      <div>
        <div>
          <h3 className="uppercase text-lg font-bold mb-2">
            {t("tenant-input.title1")}
          </h3>
          <label className="flex flex-col mb-3">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.trade-profile")}
            </span>
            <select required className="*:font-thin py-2 border-b">
              {Object.entries(
                t("tenant.types", {
                  returnObjects: true,
                })
              ).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col mb-3">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.desired-area")}
            </span>
            <input required className="*:font-thin py-1 border-b" type="text" />
          </label>
          <label className="flex flex-col mb-3">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.company-name")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              onChange={handleChange}
              value={tenantInfo.name}
              name="name"
            />
          </label>
          <label className="flex flex-col mb-3">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column1.content")}
            </span>
            <input
              required
              className="*:font-thin py-1 border-b"
              type="text"
              onChange={handleChange}
              value={tenantInfo.content}
              name="content"
            />
          </label>
          <WeekSchedule />
        </div>
        <div>
          <h3 className="uppercase text-lg font-bold mb-2">
            {t("tenant-input.title2")}
          </h3>
          <label className="flex flex-col mb-3">
            <span className="text-[#858585] font-bold">
              {t("tenant-input.column2.phone")}
            </span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              placeholder="+998 __ ___ __ __"
              onChange={handleChange}
              value={tenantInfo.phone_number}
              name="phone_number"
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
