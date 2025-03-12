
import Title from "@/components/ui/Title";
import { useTranslation } from "react-i18next";
import Subtitle from "@/components/ui/Subtitle";
import SendButton from "@/components/ui/SendButton";
import { useHttp } from "@/hooks/useHttp";
import { useEffect, useState } from "react";
import StaticHeader from "@/components/header/StaticHeader";

const TIME_SHOW_MODAL = 2000

const LostItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { t, i18n } = useTranslation();
  const { request } = useHttp();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [lostItemInfo, setLostItemInfo] = useState({
    comments_lost: "",
    name_contact_face: "",
    name_place: "",
    phone_number_contact_face: "+998 ",
    time_to_lost: "",
    what_lost: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLostItemInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const send = async (e: React.FormEvent, info: any) => {
    e.preventDefault();

    console.log("Данные перед отправкой:", JSON.stringify(info, null, 2));

    try {
      const response = await fetch(`${apiBaseUrl}/settings/lost-found/`, {
        method: "POST", // Или "PUT"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      console.log("Заявка успешно отправлена!");
      setIsModalOpen(true); // Открываем модалку

      setTimeout(() => {
        setIsModalOpen(false); // Закрываем через 3 секунды
      }, TIME_SHOW_MODAL);

      setLostItemInfo({
        comments_lost: "",
        name_contact_face: "",
        name_place: "",
        phone_number_contact_face: "+998 ",
        time_to_lost: "",
        what_lost: "",
      });
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setErrorMessage("Ошибка отправки заявки. Попробуйте снова.");
      setTimeout(() => {
        setErrorMessage("")
      }, TIME_SHOW_MODAL)
    }
  };

  useEffect(() => {
    request(`${apiBaseUrl}/settings/lost-found`, "GET", null, {
      "Accept-Language": `${i18n.resolvedLanguage}`,
    }).then((res) => console.log(res));
  }, []);

  return (
    <>
      <StaticHeader />
      <div id="lost-item" className="pb-20 px-5 relative pt-30 md:px-35">
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="*:text-white">
          <Title className="max-w-[800px]" text={t("lost-item.title")} />
          <Subtitle text={t("lost-item.subtitle")} />
        </div>
        <div className="mt-5 md:mt-0 flex justify-center">
          <form
            onSubmit={(e) => send(e, lostItemInfo)}
            className="w-full max-w-[800px] p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
            action="#"
          >
            <div>
              <div>
                <h3 className="uppercase font-bold mb-2">
                  {t("lostItem-input.title1")}
                </h3>
                <label className="flex flex-col mb-3" htmlFor="second-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column1.contact-name")}
                  </span>
                  <input
                    placeholder="Цыркач Виталий Владиленович"
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="second-label"
                    name="name_contact_face"
                    value={lostItemInfo.name_contact_face}
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="second-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column1.phone")}
                  </span>
                  <input
                    placeholder="+998 -- --- -- -- "
                    className="*:font-thin py-1 border-b"
                    type="tel"
                    id="second-label"
                    value={lostItemInfo.phone_number_contact_face}
                    name="phone_number_contact_face"
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="third-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column1.what-lost")}
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="third-label"
                    value={lostItemInfo.what_lost}
                    name="what_lost"
                    maxLength={60}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <h3 className="uppercase font-bold mb-2">
                  {t("lostItem-input.title2")}
                </h3>
                <label className="flex flex-col mb-3" htmlFor="fourth-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column2.where")}
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="fourth-label"
                    value={lostItemInfo.name_place}
                    name="name_place"
                    maxLength={100}
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="fifth-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column2.time")}
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="time"
                    id="fifth-label"
                    value={lostItemInfo.time_to_lost}
                    name="time_to_lost"
                    onChange={handleChange}
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="sixth-label">
                  <span className="text-[#858585] font-bold">
                    {t("lostItem-input.column2.comment")}
                  </span>
                  <textarea
                    className="*:font-thin py-1 border-b"
                    id="sixth-label"
                    value={lostItemInfo.comments_lost}
                    name="comments_lost"
                    maxLength={500}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex justify-center mt-10">
                <SendButton />
              </div>
            </div>
          </form>
        </div>
      </div>
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

export default LostItem;
