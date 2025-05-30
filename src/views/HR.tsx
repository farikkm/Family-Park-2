import StaticHeader from "@/components/header/StaticHeader";
import HRModal from "@/components/hr/HRModal";
import Vacations from "@/components/hr/Vacations";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const HR = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const whyOurCompanyItems = t("hr.why_our_company.items", {
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

  return (
    <>
      <StaticHeader />
      <div id="hr" className="relative pt-30 pb-10 px-5 md:px-30">
        <div className="blue-gradient absolute left-0 top-0 w-full h-110 -z-1" />
        <Title text={t("hr.title")} />
        <Subtitle text={t("hr.subtitle")} />

        {/* ===================== Почему наша компания? ===================== */}
        <div className="mt-12 py-7 md:py-12 max-w-[800px] md:max-w-[1200px] md:mx-auto gray-gradient backdrop-blur-xl light-shadow rounded-4xl">
          <h5 className="font-black text-center md:text-xl">
            { t("hr.why_our_company.title") }
          </h5>
          <div className="w-fit md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col gap-10 justify-center mt-5 mx-auto px-5 md:px-12 md:mt-10">
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
            {/* Вакансии в FamilyPark */}
            <Vacations category_vacations={2} />
            {/* Вакансии арендаторов Family Park */}
            <Vacations category_vacations={1}/>
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
            <HRModal />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default HR;
