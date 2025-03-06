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
    <Link to="/market">
      <div className="py-3 px-5 bg-gradient-to-br from-[#CECFEE] to=[#FFF] backdrop-blur-xl shadow-xs shadow-black rounded-4xl md:rounded-2xl md:p-5 md:w-fit text-black!">
        <img className="rounded-4xl md:w-[300px]" src={img} alt="shop-img" />
        <span className="block mt-1 text-xs">{catalog}</span>
        <h4 className="text-lg font-bold">{name}</h4>
      </div>
    </Link>
  );
};

export default CatalogItem;
