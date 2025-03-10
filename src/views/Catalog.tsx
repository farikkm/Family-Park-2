import CatalogItem from "@/components/catalog/CatalogItem";
import Header from "@/components/Header";

import shopImg from "@/assets/images/shops/shop.png";

const Catalog = () => {
  return (
    <>
      <Header icons="white" />
      <div id="catalog" className="relative pt-30 px-5 mb-5">
        <div className="absolute left-0 top-0 w-full h-90 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
        <h1 className="text-white text-5xl md:text-7xl md:mt-7 font-black md:mb-1">КАТАЛОГ</h1>
        <span className="text-white text-3xl font-normal">Магазины</span>
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
