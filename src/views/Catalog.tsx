import CatalogItem from "@/components/catalog/CatalogItem";


import shopImg from "@/assets/images/shops/shop.png";
import StaticHeader from "@/components/header/StaticHeader";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const { t } = useTranslation()
  const { category } = useParams<{ category: string }>();

  return (
    <>
      <StaticHeader />
      <div id="catalog" className="relative pt-30 px-5 md:px-35 mb-5">
        <div className="absolute left-0 top-0 w-full h-90 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
        <h1 className="text-white text-5xl md:text-7xl md:mt-7 font-black md:mb-1 uppercase">{ t("catalog.title") }</h1>
        <span className="text-white text-3xl font-normal">{ t(`${category}.category`) }</span>
        <div className="grid grid-cols-2 gap-3 gap-y-5 md:gap-y-10 mt-5 md:grid-cols-4">
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
          <CatalogItem catalog="Магазины" name="Carrefour" img={shopImg} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
 