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
      <div className="py-3 px-5 bg-gradient-to-br from-[#CECFEE] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl md:rounded-3xl md:p-5 w-fit text-black!">
        <img className="rounded-4xl md:w-[300px] 3xl:w-[350px]" src={img} alt="shop-img" />
        <span className="block mt-1 text-xs 3xl:text-lg">{catalog}</span>
        <h4 className="text-lg font-bold 3xl:text-2xl">{name}</h4>
      </div>
    </Link>
  );
};

export default CatalogItem;
