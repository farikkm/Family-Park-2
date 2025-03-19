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

interface EventsType {
  id: number;
  event_data: string;
  media: string;
  time_events_start: string;
  time_events_end: string;
  title: string;
  location: string;
  subtitles: string;
  context: string;
  url_events: string;
  image_events: string;
  status_event: boolean;
}

export type { WorkingHours, CatalogItemsProps, EventsType }