import { useTranslation } from "react-i18next";
import FileUploader from "@/components/hr/FileUploader";
import { motion } from "motion/react";
import { useState } from "react";
import { useHttp } from "@/hooks/useHttp";

interface WorkerInfoType {
  full_name: string;
  email: string;
  phone: string;
  link: string;
  file: string;
}

const workerInfoModel: WorkerInfoType = {
  full_name: "",
  email: "",
  phone: "+998",
  link: "",
  file: "",
};

const TIME_SHOW_MODAL = 3000;

function HRModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [linkError, setLinkError] = useState("");

  const { t } = useTranslation();
  const { request } = useHttp();

  const [workerInfo, setWorkerInfo] = useState<WorkerInfoType>(workerInfoModel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setWorkerInfo((prev) => ({
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

    setWorkerInfo((prev) => ({ ...prev, phone: formatted }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setWorkerInfo((prev) => ({ ...prev, email }));

    // Проверяем email на корректность
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.trim();
    setWorkerInfo((prev) => ({ ...prev, link }));
  
    // Регулярное выражение для проверки ссылки (обязательно начинается с https://)
    const linkPattern = /^https:\/\/[\w-]+(\.[\w-]+)+([/?#].*)?$/;
  
    if (link && !link.match(linkPattern)) {
      setLinkError("Ссылка должна начинаться с 'https://'");
    } else {
      setLinkError("");
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Данные перед отправкой:", JSON.stringify(workerInfo, null, 2));

    request("/vacancy-send/", "POST", workerInfo)
      .then(() => {
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false); // Закрываем через 3 секунды
        }, TIME_SHOW_MODAL);
      })
      .catch((error) => {
        if (error.file) {
          setErrorMessage(error.file)
        } else {
          setErrorMessage("Ошибка отправки заявки. Попробуйте снова.");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      })
      .finally(() => {
        setWorkerInfo(workerInfoModel);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[930px] md:px-14 px-6 py-8 md:h-[560px] h-[500px] mx-6 rounded-4xl bg-[#F1F1F1]  *:text-black overflow-y-auto"
    >
      <form
        onSubmit={send}
        id="hr-form"
        action="#"
        className="flex w-full flex-col gap-6 items-center"
      >
        <h2 className="text-center text-4xl font-bold">
          {t("hr.modal.title")}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-between w-full *:md:max-w-[250px] *:w-full">
          <label className="flex flex-col mb-3">
            <span className="text-black font-bold">{t("hr.modal.label1")}</span>
            <input
              className="*:font-thin py-1 border-b active:outline-0"
              type="text"
              name="full_name"
              onChange={handleChange}
              maxLength={50}
              value={workerInfo.full_name}
              placeholder="Цыркач Виталий Владиленович"
            />
          </label>
          <label className="flex flex-col mb-3">
            <span className="text-black font-bold">{t("hr.modal.label2")}</span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              name="phone"
              onChange={handlePhoneChange}
              // pattern="^\+998[0-9]{9}$"
              placeholder="+998 XX XXX XX XX"
              maxLength={17}
              value={workerInfo.phone}
              required
            />
          </label>
          <label className="flex flex-col mb-3">
            <span className="text-black font-bold">{t("hr.modal.label3")}</span>
            <input
              className="*:font-thin py-1 border-b"
              type="text"
              name="email"
              placeholder="example@email.com"
              value={workerInfo.email}
              onChange={handleEmailChange}
              maxLength={50}
              required
            />
            {emailError && (
              <span className="text-red-500 text-sm">{emailError}</span>
            )}
          </label>
        </div>
        <FileUploader setWorkerInfo={setWorkerInfo} />
        <p>
          <strong>{t("hr.modal.attention")}</strong>{" "}
          {t("hr.modal.attentionText")}{" "}
          <strong>{t("hr.modal.fileSize")}</strong>
        </p>
        <div className="max-w-[600px] w-full">
          <label className="w-full flex flex-col mb-3" htmlFor="third-label">
            <span className="text-[#474747] font-bold">
              {t("hr.modal.link")}
            </span>
            <input
              className="*:font-thin py-1 border-b active:outline-0"
              type="text"
              placeholder="LinkedIn.com, HH.uz, OLX.uz"
              name="link"
              onChange={handleLinkChange}
              id="third-label"
              maxLength={50}
              value={workerInfo.link}
            />
            {linkError && <span className="text-red-500 text-sm">{linkError}</span>}
          </label>
        </div>
        <div>
          <button
            className="cursor-pointer active:scale-110 transition-all red-gradient text-white uppercase px-16 py-4 font-black rounded-4xl"
          >
            {t("buttons.send")}
          </button>
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
    </motion.div>
  );
}

export default HRModal;
