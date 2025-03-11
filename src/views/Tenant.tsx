import Header from "@/components/Header";
import TenantForm from "@/components/tenant/TenantForm";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useTranslation } from "react-i18next";
// import { useHttp } from "@/hooks/useHttp";

const Tenant = () => {
  const { t } = useTranslation();
  // const {request} = useHttp()
  // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // const tenantTypes = t("tenant.types", {
  //   returnObjects: true,
  // }) as Record<string, string>;

  // useEffect(() => {
  //   request(`${apiBaseUrl}/tenats/tenats`, "POST", {
  //     name: "KFC",
  //     tenant_type: "Food",
  //     working_day: ["Monday", "Thursday", "Sunday"],
  //     working_hours_open: "9:00",
  //     working_hours_close: "18:00",
  //     phone_number: "998 91 123 45 67",
  //     key_word: "Kentuky",
  //     short_descriptions: "The tastiest chicken",
  //     alias: "KFC",
  //     status: true,
  //     content: "Kentucky Fried Chicken",
  //     map_t: "100.1"
  //   }).then(res => console.log(res))
  // }, [])

  return (
    <>
      <Header />
      <div id="tenant" className="pb-20 pt-30 px-5 relative">
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="*:text-white">
          <Title text={t("tenant.title")} className="md:max-w-[800px]" />
          <Subtitle text={t("tenant.subtitle")} />
        </div>
        <div className="mt-5 md:mt-0 flex justify-center">
          <TenantForm />
        </div>
      </div>
    </>
  );
};

export default Tenant;
