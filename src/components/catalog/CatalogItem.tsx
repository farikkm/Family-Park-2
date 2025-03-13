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
      <img src={img} alt={name} className="w-full rounded-3xl" />
      <span className="block mt-2 font-bold text-xl md:text-2xl">{name}</span>
      <span className="text-base">{catalog}</span>
    </Link>
  );
};

export default CatalogItem;
