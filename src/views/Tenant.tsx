import StaticHeader from "@/components/header/StaticHeader";
import TenantForm from "@/components/tenant/TenantForm";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useTranslation } from "react-i18next";

const Tenant = () => {
  const { t } = useTranslation();

  return (
    <>
      <StaticHeader />
      <div id="tenant" className="pb-20 pt-30 relative">
        <div className="red-gradient absolute left-0 top-0 w-full h-140 -z-1" />
        <div className="_container">
          <div className="*:text-white">
            <Title
              text={t("tenant.title")}
              className="uppercase md:max-w-[800px]"
            />
            <Subtitle text={t("tenant.subtitle")} />
          </div>
          <div className="mt-5 md:mt-0 flex justify-center">
            <TenantForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tenant;
