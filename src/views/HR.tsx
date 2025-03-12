
import StaticHeader from "@/components/header/StaticHeader";
import FileUploader from "@/components/hr/FileUploader";
import Accordion from "@/components/ui/Accordion";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const vacancies = [
  {
    id: 1,
    imgPath: "/icons/smile.png",
    text: "Ассистент графического дизайнера",
  },
  {
    id: 2,
    imgPath: "/icons/smile.png",
    text: "Ассистент графического дизайнера",
  },
  {
    id: 3,
    imgPath: "/icons/smile.png",
    text: "Ассистент графического дизайнера",
  },
];


const HR = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const whyOurCompanyItems = t("hr.why_our_company", {
    returnObjects: true,
  }) as string[];

  function openModal() {
    setShowModal(true);
    document.body.classList.add("lock");
  }

  function closeModal() {
    setShowModal(false);
    document.body.classList.remove("lock");
  }

  function closeModalByBackdrop(e: React.FormEvent) {
    const isClickOnBackdrop = e.target === modalRef.current;
    if (isClickOnBackdrop) closeModal();
  }

  function sendInfo() {
    closeModal();
  }
  return (
    <>
      <StaticHeader icons="white" />
      <div id="hr" className="relative pt-30 pb-10 px-5 md:px-30">
        <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
        <h1 className="text-white text-5xl md:text-7xl md:mt-5 md:mb-3 font-black mb-1">
          {t("hr.title")}
        </h1>
        <span className="text-white text-2xl font-normal">
          {t("hr.subtitle")}
        </span>

        {/* ===================== Почему наша компания? ===================== */}
        <div className="mt-12 py-7 md:max-w-[800px] md:mx-auto bg-gradient-to-br from-[#CECFEE] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl">
          <h5 className="font-black text-center md:text-xl">
            Почему наша компания?
          </h5>
          <div className="w-fit flex flex-col gap-10 justify-center mt-5 mx-auto px-5">
            {whyOurCompanyItems.map((text, index) => (
              <div key={index} className="flex items-center gap-4">
                <button className="block light-shadow py-2 px-4  min-w-[52px] rounded-[25px] text-3xl font-black text-white bg-gradient-to-br from-[#25254C] to-[#6A6DBD]">
                  {index + 1}
                </button>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== оставить резюме ===================== */}
        <div className="border-bottom mb-10 -translate-y-7">
          <div className="flex justify-center">
            <button
              onClick={openModal}
              className="cursor-pointer active:scale-110 transition-all red-gradient translate-y-15 text-white uppercase px-7 py-5 font-black rounded-4xl"
            >
              {t("hr.modal.title")}
            </button>
          </div>
        </div>

        {/* ===================== Вакансии ===================== */}
        <div className="w-full flex justify-center">
          <div className="max-w-[800px] w-full">
            <Accordion
              className="mt-0!"
              title="Вакансии В family park"
              initialState="open"
            >
              <div className="mt-7 flex flex-col gap-5 px-5">
                {vacancies.map((vacancie) => (
                  <div
                    key={vacancie.id}
                    className="flex gap-5 items-center border-b border-b-[#888888] pb-3"
                  >
                    <div className="red-gradient p-4 rounded-4xl">
                      <img src={vacancie.imgPath} alt="smile-icon" />
                    </div>
                    <span className="text-black">{vacancie.text}</span>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion
              className="mt-6!"
              title="Вакансии арендаторов family park"
            >
              <div className="mt-7 flex flex-col gap-5 px-5">
                {vacancies.map((vacancie) => (
                  <div
                    key={vacancie.id}
                    className="flex gap-5 items-center border-b border-b-[#888888] pb-3"
                  >
                    <div className="red-gradient p-4 rounded-4xl">
                      <img src={vacancie.imgPath} alt="smile-icon" />
                    </div>
                    <span className="text-black">{vacancie.text}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            id="hr-modal"
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0 }}
            onClick={closeModalByBackdrop}
            className="backdrop-blur-md bg-[rgba(26,26,26,0.5)] fixed left-0 top-0 w-screen h-screen flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[930px] md:px-14 px-6 py-8 md:h-[560px] h-[500px] mx-6 rounded-4xl bg-[#F1F1F1]  *:text-black overflow-y-auto"
            >
              <div className="flex w-full flex-col gap-6 items-center">
                <h2 className="text-center text-4xl font-bold">
                  {t("hr.modal.title")}
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-between w-full *:md:max-w-[250px] *:w-full">
                  <label className="flex flex-col mb-3">
                    <span className="text-black font-bold">
                      {t("hr.modal.label1")}
                    </span>
                    <input
                      className="*:font-thin py-1 border-b active:outline-0"
                      type="text"
                      placeholder="Цыркач Виталий Владиленович"
                    />
                  </label>
                  <label className="flex flex-col mb-3">
                    <span className="text-black font-bold">
                      {t("hr.modal.label2")}
                    </span>
                    <input className="*:font-thin py-1 border-b" type="text" />
                  </label>
                  <label className="flex flex-col mb-3">
                    <span className="text-black font-bold">
                      {t("hr.modal.label3")}
                    </span>
                    <input className="*:font-thin py-1 border-b" type="text" />
                  </label>
                </div>
                <FileUploader />
                <p>
                  <strong>{t("hr.modal.attention")}</strong>
                  {" "}
                  {t("hr.modal.attentionText")}
                  {" "}
                  <strong>{t("hr.modal.fileSize")}</strong>
                </p>
                <div className="max-w-[600px] w-full">
                  <label
                    className="w-full flex flex-col mb-3"
                    htmlFor="third-label"
                  >
                    <span className="text-[#474747] font-bold">
                      {t("hr.modal.link")}
                    </span>
                    <input
                      className="*:font-thin py-1 border-b active:outline-0"
                      type="text"
                      placeholder="LinkedIn.com, HH.uz, OLX.uz"
                      id="third-label"
                    />
                  </label>
                </div>
                <div>
                  <button
                    onClick={sendInfo}
                    className="cursor-pointer active:scale-110 transition-all red-gradient text-white uppercase px-16 py-4 font-black rounded-4xl"
                  >
                    {t("buttons.send")}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HR;
