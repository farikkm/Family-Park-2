import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const allowedFileTypes = [
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/pdf", // .pdf
  "application/rtf", // .rtf
  "image/png", // .png
  "image/jpeg", // .jpeg, .jpg
];

const FileUploader = ({ setWorkerInfo }: { setWorkerInfo: any }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!allowedFileTypes.includes(file.type)) {
      setError(t("hr.modal.invalidFileType")); // Показываем ошибку
      setFileName(""); // Сбрасываем имя файла
      return;
    }

    setError(""); // Очищаем ошибку
    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file); // Читаем файл в формате base64

    reader.onload = () => {
      const base64String = reader.result as string; // Получаем строку base64
      setWorkerInfo((prev: any) => ({ ...prev, file: base64String })); // Записываем в состояние
    };

    reader.onerror = (error) => {
      console.error("Ошибка при чтении файла:", error);
    };
  };

  return (
    <div className="border-2 border-dashed border-black py-6 px-6 md:px-32 text-center">
      <p className="text-gray-700">
        {t("hr.modal.dragFile")}{" "}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {t("hr.modal.loadFile")}
        </span>
        <br />
        (doc, pdf, docx, rtf, png, jpeg, jpg).
      </p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={allowedFileTypes.join(",")}
        onChange={handleFileChange}
      />
      {fileName && <p className="mt-2 text-sm text-green-600">{t("hr.modal.selectedFile")}{fileName}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUploader;
