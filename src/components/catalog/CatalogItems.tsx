import CatalogItem from "./CatalogItem";
import { CatalogItemsProps } from "@/types";

interface Props {
  items?: CatalogItemsProps[], 
  className?: string
}

const CatalogItems = ({ items = [], className = "" }: Props) => {
  return (
    <div className={`grid gap-4 grid-cols-2 sm:grid-cols-3 mt-14 *:text-[#25254C] *:max-w-[200px] md:hidden ${className}`}>
      {items.length > 0 && items.slice(0,2).map((item: CatalogItemsProps) => (
        <CatalogItem
          id={item.id}
          key={item.id}
          img={item.logo}
          catalog={item.tenant_type}
          name={item.name}
        />
      ))}
    </div>  
  );
};

export default CatalogItems;
