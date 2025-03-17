import CatalogItem from "@/components/catalog/CatalogItem";

import shopImg from "@/assets/images/shops/shop.png";
import StaticHeader from "@/components/header/StaticHeader";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/useHttp";

interface WorkingHours {
  working_day: string;
  working_hours_open: string;
  working_hours_close: string;
}

interface CatalogItemsProps {
  name: string;
  tenant_type: string;
  working_hours: WorkingHours[];
  desired_area: string;
  phone_number: string;
  key_word: string;
  alias: string;
  content: string;
  logo: string;
  status: boolean
}

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);
  const { i18n, t } = useTranslation();
  const { category } = useParams<{ category: string }>();

  // Backend
  const { request } = useHttp();

  useEffect(() => {
    request("/tenats/tenats/", "GET", null, {
      "Accept-Language": `${i18n.resolvedLanguage}`,
    }).then((res: CatalogItemsProps[]) => {
      const filteredItems = res.filter(item => item.tenant_type.toLowerCase() === category?.toLowerCase())
      setCatalogItems(filteredItems)
    });
  }, [i18n.resolvedLanguage]);

  return (
    <>
      <StaticHeader />
      <div id="catalog" className="relative pt-30 px-5 md:px-35 mb-5">
        <div className="absolute left-0 top-0 w-full h-90 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
        <h1 className="text-white text-5xl md:text-7xl md:mt-7 font-black md:mb-1 uppercase">
          {t("catalog.title")}
        </h1>
        <span className="text-white text-3xl font-normal">
          {t(`${category}.category`)}
        </span>
        <div className="grid grid-cols-2 gap-3 gap-y-5 md:gap-y-10 mt-5 md:grid-cols-4">
          { catalogItems.map((item, index) => (
            <CatalogItem key={index} catalog={item.tenant_type} name={item.name} img={item.logo} />
          )) }
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />

        </div>
      </div>
    </>
  );
};

export default Catalog;
