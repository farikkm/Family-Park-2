import getHref from "@/utils/getHref";
import { Link } from "react-router-dom";

const SeeAllButton = () => {
  return (
    <Link to={getHref("/catalog")} className="see-all">
      Посмотреть все
    </Link>
  );
};

export default SeeAllButton;
