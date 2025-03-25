import { useTranslation } from "react-i18next";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import SendButton from "../ui/SendButton";
import { Link } from "react-router-dom";
import getHref from "@/utils/getHref";

function Tenant() {
  const { t } = useTranslation();

  const link_to_tenant_page = getHref("/tenant");

  const tenantTypes = t("tenant.types", {
    returnObjects: true,
  }) as Record<string, string>;

  return (
    <div id="tenant" className="pb-20 pt-5 px-5 relative md:pt-30 md:px-35">
      <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
      <div className="*:text-white">
        <Title className="uppercase! max-xl:text-5xl!" text={t("home.tenant.title")} />
        <Subtitle text={t("home.tenant.subtitle")} />
      </div>
      <div className="mt-15 md:mt-10 md:max-w-4xl 3xl:max-w-5xl md:mx-auto">
        <form
          id="home-tenant"
          className="p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
          action="#"
        >
          <div className="grid md:grid-cols-1 md:gap-5">
            <h3 className="uppercase font-bold mb-2 text-sm 3xl:text-xl">
              {t("tenant-input.title1")}
            </h3>
            <label className="flex flex-col mb-3" htmlFor="first-label">
              <span className="text-[#858585] font-bold text-sm 3xl:text-lg">
                {t("tenant-input.column1.trade-profile")}
              </span>
              <select
                className="*:font-thin py-2 border-b 3xl:text-lg"
                id="first-label"
              >
                {Object.entries(tenantTypes).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-center mt-10">
            <Link to={link_to_tenant_page}>
              <SendButton />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tenant;