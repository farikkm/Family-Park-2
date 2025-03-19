import CatalogItem from "@/components/catalog/CatalogItem";
import StaticHeader from "@/components/header/StaticHeader";

import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { CatalogItemsProps } from "@/types";

const TIME_SHOW_MODAL = 3000;

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);
  const { i18n, t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const [errorMessage, setErrorMessage] = useState("");

  // Backend
  const { request, loading } = useHttp();

  useEffect(() => {
    request("/tenats/tenats/", "GET", null)
      .then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter(
          (item) => item.tenant_type.toLowerCase() === category?.toLowerCase()
        );

        setCatalogItems(filteredItems);
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage, category]);

  return (
    <>
      <StaticHeader />
      <div id="catalog" className="relative pt-30 mb-5">
        <div className="absolute left-0 top-0 w-full h-90 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
        <div className="_container">
          <h1 className="text-white text-5xl md:text-7xl md:mt-7 font-black md:mb-1 uppercase">
            {t("catalog.title")}
          </h1>
          <span className="text-white text-3xl font-normal">
            {t(`${category}.category`)}
          </span>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 gap-y-5 md:gap-y-10 mt-5 md:grid-cols-4">
              {catalogItems.filter((item) => item.status).length > 0 ? (
                catalogItems
                  .filter((item) => item.status)
                  .map((item) => (
                    <CatalogItem
                      key={item.id}
                      id={item.id}
                      shop_name={item.name}
                      catalog={item.tenant_type}
                      name={item.name}
                      img={item.logo}
                    />
                  ))
              ) : (
                <p className="text-white text-3xl col-span-2 md:col-span-4 text-center">
                  {t("catalog.no_items")}
                </p>
              )}
            </div>
          )}
          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalog;
