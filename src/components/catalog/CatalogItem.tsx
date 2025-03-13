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
    <Link to={getHref("/market")}>
      <div className="w-full py-3 px-5 bg-gradient-to-br from-[#CECFEE] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl md:rounded-3xl md:p-5 text-black!">
        <img className="rounded-4xl w-full h-full" src={img} alt="shop-img" />
        <span className="block mt-1 text-xs 3xl:text-lg">{catalog}</span>
        <h4 className="text-lg font-bold 3xl:text-2xl">{name}</h4>
      </div>
    </Link>
  );
};

export default CatalogItem;
