import { useTranslation } from "react-i18next";
import FileUploader from "@/components/hr/FileUploader";
import { motion } from "motion/react";

function HRModal({ sendInfo }: { sendInfo: () => void }) {
  const { t } = useTranslation();

  return (
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
  );
}

export default HRModal;