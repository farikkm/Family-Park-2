import { useTranslation } from "react-i18next";
import SendButton from "../ui/SendButton";
import WeekSchedule from "./WorkingHours";
import { useState } from "react";

interface WorkingHours {
  working_day: string;
  working_hours_open: string;
  working_hours_close: string;
}

interface tenantInfoProps {
  name: string;
  tenant_type: string;
  working_hours: WorkingHours[];
  desired_area: string;
  phone_number: string;
  key_word: string;
  alias: string;
  content: string;
  logo: string;
}

// ====================

interface TenantInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const TenantInput = ({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  handleChange,
}: TenantInputProps) => {
  return (
    <label className="flex flex-col mb-3">
      <span className="text-[#858585] font-bold">{label}</span>
      <input
        required
        className="*:font-thin py-1 border-b"
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        name={name}
      />
    </label>
  );
};

// ====================

const TIME_SHOW_MODAL = 2000

const TenantForm: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const tenantInfoModel: tenantInfoProps = {
    name: "",
    tenant_type: t("tenant.types.shop"),
    working_hours: [],
    phone_number: "",
    key_word: "",
    alias: "",
    content: "",
    logo: "",
    desired_area: "",
  };
  const [tenantInfo, setTenantInfo] =
    useState<tenantInfoProps>(tenantInfoModel);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setTenantInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkingHoursChange = (updatedHours: WorkingHours[]) => {
    setTenantInfo((prev) => ({
      ...prev,
      working_hours: updatedHours,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTenantInfo((prev) => ({
          ...prev,
          logo: reader.result as string, // Устанавливаем base64-код изображения
        }));
      };
      reader.readAsDataURL(file); // Читаем файл как base64
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(tenantInfo);

    console.log("Данные перед отправкой:", JSON.stringify(tenantInfo, null, 2));

    try {
      const response = await fetch(`${apiBaseUrl}/tenats/tenats/`, {
        method: "POST", // Или "PUT"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tenantInfo),
      });
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      console.log("Заявка успешно отправлена!");
      setIsModalOpen(true); // Открываем модалку

      setTimeout(() => {
        setIsModalOpen(false); // Закрываем через 3 секунды
      }, TIME_SHOW_MODAL);

      setTenantInfo(tenantInfoModel);
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setErrorMessage("Ошибка отправки заявки. Попробуйте снова.");
      setTimeout(() => {
        setErrorMessage("");
      }, TIME_SHOW_MODAL);
    }
  };

  return (
    <>
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
              <select
                required
                name="tenant_type"
                value={tenantInfo.tenant_type}
                onChange={handleChange}
                className="*:font-thin py-2 border-b"
              >
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
            <TenantInput
              label={t("tenant-input.column1.desired-area")}
              name="desired_area"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.desired_area}
            />
            <TenantInput
              label={t("tenant-input.column1.alias")}
              name="alias"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.alias}
            />
            <TenantInput
              label={t("tenant-input.column1.key_word")}
              name="key_word"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.key_word}
            />

            <label className="flex flex-col mb-3">
              <span className="text-[#858585] font-bold">
                {t("tenant-input.column1.logo")}
              </span>
              <div className="relative w-full">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  {tenantInfo.logo
                    ? t("buttons.file_chosen")
                    : t("buttons.choose_file")}
                </button>
              </div>
              {tenantInfo.logo && (
                <img
                  src={tenantInfo.logo}
                  alt="Логотип"
                  className="mt-2 max-h-50 rounded-lg border max-w-50 w-full"
                />
              )}
            </label>

            <TenantInput
              label={t("tenant-input.column1.company-name")}
              name="name"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.name}
            />

            <TenantInput
              label={t("tenant-input.column1.content")}
              name="content"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.content}
            />
            <WeekSchedule
              working_hours={tenantInfo.working_hours}
              onChange={handleWorkingHoursChange}
            />
          </div>
          <div>
            <h3 className="uppercase text-lg font-bold mb-2">
              {t("tenant-input.title2")}
            </h3>

            <TenantInput
              label={t("tenant-input.column2.phone")}
              name="phone_number"
              handleChange={handleChange}
              type="text"
              value={tenantInfo.phone_number}
              placeholder="+998 __ ___ __ __"
            />
          </div>
          <div className="flex justify-center mt-10">
            <SendButton />
          </div>
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed top-30 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Ваша заявка успешно отправлена!
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default TenantForm;
