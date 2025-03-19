import { useTranslation } from "react-i18next";
import SendButton from "../ui/SendButton";
import WeekSchedule from "./WorkingHours";
import { useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import TenantInput from "./TenantInput";
import { WorkingHours } from "@/types";

interface TenantInfoProps {
  name: string;
  tenant_type: string;
  working_hours: WorkingHours[];
  phone_number: string;
  key_word: string;
  alias: string;
  content: string;
  logo: string;
  desired_area: string;
}

const TIME_SHOW_MODAL = 2000;

const TenantForm: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { request, loading } = useHttp();

  const tenantInfoModel: TenantInfoProps = {
    name: "",
    tenant_type: t("tenant.types.shop"), // option by default
    working_hours: [],
    phone_number: "+998",
    key_word: "",
    alias: "",
    content: "",
    logo: "",
    desired_area: "",
  };
  const [tenantInfo, setTenantInfo] =
    useState<TenantInfoProps>(tenantInfoModel);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, name } = e.target;
    console.log(value);

    setTenantInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Если пользователь удаляет "+998", не даем ему это сделать
    if (!value.startsWith("+998")) {
      value = "+998 ";
    }

    // Оставляем только цифры после "+998"
    const digits = value.replace(/\D/g, "").substring(3); // Удаляем всё кроме цифр, начиная с 4-го символа

    // Форматируем номер
    let formatted = "+998 ";
    if (digits.length > 0) formatted += digits.substring(0, 2); // Код оператора
    if (digits.length > 2) formatted += " " + digits.substring(2, 5); // Первые 3 цифры
    if (digits.length > 5) formatted += " " + digits.substring(5, 7); // Следующие 2 цифры
    if (digits.length > 7) formatted += " " + digits.substring(7, 9); // Последние 2 цифры

    setTenantInfo((prev) => ({ ...prev, phone_number: formatted }));
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
      const allowedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedFormats.includes(file.type)) {
        alert("Разрешены только файлы PNG, JPEG, JPG и SVG.");
        return;
      }

      if (file.size > maxSize) {
        alert("Размер файла не должен превышать 5MB.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setTenantInfo((prev) => ({
          ...prev,
          logo: reader.result as string, // Устанавливаем base64-код изображения
        }));
      };

      if (file.type === "image/svg+xml") {
        // SVG передаём как объект URL (не base64)
        const svgUrl = URL.createObjectURL(file);
        setTenantInfo((prev) => ({
          ...prev,
          logo: svgUrl,
        }));
      } else {
        reader.readAsDataURL(file); // Читаем файл как base64 (только для PNG, JPG)
      }
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Отправляемые данные:", tenantInfo);

    request("/tenats/tenats/", "POST", tenantInfo)
      .then(() => {
        setIsModalOpen(true);
        setTenantInfo(tenantInfoModel);
        setTimeout(() => {
          setIsModalOpen(false); // Закрываем через 3 секунды
        }, TIME_SHOW_MODAL);
      })
      .catch(() => {
        setErrorMessage("Ошибка отправки заявки. Попробуйте снова.");
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      })
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
              maxLength={10}
              value={tenantInfo.desired_area}
            />
            <TenantInput
              label={t("tenant-input.column1.alias")}
              name="alias"
              handleChange={handleChange}
              maxLength={30}
              value={tenantInfo.alias}
            />
            <TenantInput
              label={t("tenant-input.column1.key_word")}
              name="key_word"
              maxLength={30}
              handleChange={handleChange}
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
              maxLength={30}
              value={tenantInfo.name}
            />
            <label className="flex flex-col mb-3">
              <span className="text-[#858585] font-bold">
                {t("tenant-input.column1.content")}
              </span>
              <textarea
                className="*:font-thin py-1 border-b"
                name="content"
                rows={6}
                onChange={handleChange}
                maxLength={300}
                value={tenantInfo.content}
              />
            </label>

            <WeekSchedule
              working_hours={tenantInfo.working_hours}
              onChange={handleWorkingHoursChange}
            />
          </div>
          <div>
            <h3 className="uppercase text-lg font-bold mb-2">
              {t("tenant-input.title2")}
            </h3>
            <label className="flex flex-col mb-3">
              <span className="text-[#858585] font-bold">
                {t("hr.modal.label2")}
              </span>
              <input
                className="*:font-thin py-1 border-b"
                type="text"
                name="phone"
                onChange={handlePhoneChange}
                placeholder="+998 XX XXX XX XX"
                maxLength={17}
                value={tenantInfo.phone_number}
                required
              />
            </label>
          </div>
          <div className="flex justify-center mt-10">
            <SendButton disabled={loading}/>
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
