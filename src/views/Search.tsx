import CatalogItem from "@/components/catalog/CatalogItem";
import StaticHeader from "@/components/header/StaticHeader";
import Title from "@/components/ui/Title";
import { CatalogItemsProps } from "@/types";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const { t } = useTranslation();

  return (
    <div id="search">
      <StaticHeader />
      <div id="lost-item" className="pb-20 relative pt-30">
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="_container">
          <Title text={t("search.title")} />
          {results.length ? (
            <div
              className={`grid gap-4 grid-cols-2 sm:grid-cols-3 mt-14 *:text-[#25254C] *:max-w-[300px]`}
            >
              {results.length > 0 &&
                results.map((item: CatalogItemsProps) => (
                  <CatalogItem
                    id={item.id}
                    key={item.id}
                    img={item.logo}
                    catalog={item.tenant_type}
                    name={item.name}
                  />
                ))}
            </div>
          ) : (
            <p className="text-white flex justify-center items-center mt-12 text-2xl font-bold">
              {t("search.no-items-found")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
