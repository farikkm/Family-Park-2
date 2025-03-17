import getHref from "@/utils/getHref";
import { Link } from "react-router-dom";

const CatalogItem = ({
  img,
  catalog,
  name,
}: {
  img: string;
  catalog: string;
  name: string;
}) => {
  return (
    <Link
      className="gray-gradient p-5 pb-4 block rounded-3xl *:text-black"
      to={getHref("/market")}
    >
      <div className="h-[150px] xs:h-[180px] sm:h-[250px] md:h-[300px] 2xl:h-[400px] 3xl:h-[450px] overflow-hidden rounded-3xl">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="block mt-2 font-bold text-lg sm:text-xl md:text-2xl">
        {name ? name : "Название заведения"}
      </span>
      <span className="text-base">
        {catalog ? catalog : "Категория заведения"}
      </span>
    </Link>
  );
};

export default CatalogItem;
