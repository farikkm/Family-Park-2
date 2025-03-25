import { useHttp } from "@/hooks/useHttp";
import { CatalogItemsProps } from "@/types";
import filterByStatus from "@/utils/filterByStatus";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Title from "../ui/Title";
import SeeAllButton from "../ui/SeeAllButton";
import { ClipLoader } from "react-spinners";
import isMobileUtil from "@/utils/isMobile";
import { SliderMobile } from "../Slider";
import CatalogItems from "../catalog/CatalogItems";
import useIntersection from "@/hooks/useIntersection";

interface SectionWithCatalogItemsType {
  section_id: string;
  category_type: string;
  background: "red" | "blue";
}

const TIME_SHOW_MODAL = 3000;

const SectionWithCatalogItems = ({
  section_id,
  category_type,
  background,
}: SectionWithCatalogItemsType) => {
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);

  const { request, loading } = useHttp();
  const { isVisible, elementRef } = useIntersection();

  useEffect(() => {
    if (!isVisible) return;

    request("/tenats/tenats/", "GET", null)
      .then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter(
          (item) => item.tenant_type.toLowerCase() === category_type
        );

        setCatalogItems(filterByStatus(filteredItems));
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage, isVisible]);

  return (
    <section id={section_id} ref={elementRef} className="relative md:pt-30 pt-5">
      {/* Decor */}
      <div
        className={`${background}-gradient absolute left-0 top-0 w-full h-90 -z-1`}
      />
      {/* Content */}
      <div className="_container">
        <div className="shops__content pt-5 text-white">
          <div className="md:flex flex-col lg:flex-row items-center justify-between">
            <Title text={t(`home.${category_type}.title`)} />
            <SeeAllButton link={`/catalog/${category_type}`} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : catalogItems.length > 0 ? (
            <>
              {/* ===== Desktop ===== */}
              {!isMobileUtil() && <SliderMobile items={catalogItems} />}
              {/* ===== Mobile ===== */}
              <CatalogItems items={catalogItems} />
            </>
          ) : (
            <p className="flex justify-center items-center my-15 font-bold text-2xl sm:text-3xl">
              Данные не найдены
            </p>
          )}

          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionWithCatalogItems;
