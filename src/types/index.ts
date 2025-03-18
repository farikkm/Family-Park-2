interface WorkingHours {
  working_day: string;
  working_hours_open: string;
  working_hours_close: string;
}

interface CatalogItemsProps {
  id: number;
  name: string;
  tenant_type: string;
  working_hours: WorkingHours[];
  desired_area: string;
  phone_number: string;
  key_word: string;
  alias: string;
  content: string;
  logo: string;
  status?: boolean;
}

export type { WorkingHours, CatalogItemsProps }