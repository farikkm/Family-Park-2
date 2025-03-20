import getHref from "@/utils/getHref";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CatalogItem = ({
  img,
  catalog,
  name,
  id
}: {
  img: string;
  catalog: string;
  name: string;
  shop_name?: string;
  id: number
}) => {

  const { t } = useTranslation();

  return (
    <Link
      className="gray-gradient max-w-[380px] w-full md:p-5 p-3 pb-4 block rounded-3xl *:text-black"
      to={getHref(`/market/${id}`)}
    >
      <div className=" h-[150px] xs:h-[170px] sm:h-[220px] md:h-[280px] 2xl:h-[300px] 3xl:h-[350px] overflow-hidden rounded-3xl">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="block mt-2 font-bold text-lg sm:text-xl md:text-2xl truncate overflow-hidden whitespace-nowrap">
        {name ? name : "Название заведения"}
      </span>
      <span className="text-base">
        {catalog ? t(`${catalog.toLowerCase()}.category`) : "Категория заведения"}
      </span>
    </Link>
  );
};

export default CatalogItem;
