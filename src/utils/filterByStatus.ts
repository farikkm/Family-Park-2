import { CatalogItemsProps } from "@/types";

export default function filterByStatus(items: CatalogItemsProps[]) {
  return items.filter(item => item.status)
}