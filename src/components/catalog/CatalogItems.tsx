import CatalogItem from "./CatalogItem";

interface Props {
  items?: any, 
  className?: string
}

const CatalogItems = ({ items = [], className = "" }: Props) => {
  return (
    <div className={`grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden ${className}`}>
      {items.map((item: any) => (
        <CatalogItem
          key={item.id}
          img={item.img}
          catalog={item.catalogVar}
          name={item.nameVar}
        />
      ))}
    </div>
  );
};

export default CatalogItems;
