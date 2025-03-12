import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const FileUploader = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="border-2 border-dashed border-black py-6 px-6 md:px-32 text-center">
      <p className="text-gray-700">
        {t("hr.modal.dragFile")}
        {" "}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {t("hr.modal.loadFile")}
        </span>
        <br />
        (doc, pdf, docx, rtf).
      </p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".doc,.pdf,.docx,.rtf"
        onChange={handleFileChange}
      />
      {fileName && (
        <p className="mt-2 text-sm text-green-600">{t("hr.modal.selectedFile")} {fileName}</p>
      )}
    </div>
  );
};

export default FileUploader