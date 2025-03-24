import getHref from "@/utils/getHref";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Statistics() {
  const { t } = useTranslation();
  const items = Object.values(
    t("home.statistics.bottom", { returnObjects: true })
  );

  return (
    <section id="statistics" className="z-20">
      <div className="red-gradient statistics-top py-7 px-5 text-white md:pt-30 3xl:pt-35 3xl:pb-15 ">
        <h2 className="text-4xl 3xl:text-5xl max-w-sm  mx-auto text-center md:max-w-full">
          {t("home.statistics.title")}
        </h2>
        <div className="hidden md:grid grid-cols-2 gap-4 mt-4 md:mt-8 md:max-w-4xl md:mx-auto md:grid-cols-4">
          <div>
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              80+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              {t("home.statistics.top.item1")}
            </span>
          </div>
          <div>
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              10+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              {t("home.statistics.top.item2")}
            </span>
          </div>
          <div className="block">
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              20+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              {t("home.statistics.top.item3")}
            </span>
          </div>
          <div className="block md:max-w-[300px]">
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              {t("home.statistics.top.item4")}
            </span>
          </div>
        </div>
      </div>
      {/* ========================= BOTTOM-ITEMS ======================== */}
      <div className="px-2">
        <div
          className="statistics-bottom my-5 grid grid-cols-2 md:grid-cols-4 max-w-[400px] 
        md:max-w-[1100px] 3xl:max-w-[1100px] md:h-55 mx-auto rounded-4xl 
        overflow-hidden *:text-white"
        >
          {items.map((item, index) => (
            <Link
              to={getHref(item.link)}
              key={index}
              className="relative p-3 pr-10 h-auto nth-[1]:bg-[#FD7824] nth-[2]:bg-[#CF3559] nth-[3]:bg-[#8A6ABD] nth-[4]:bg-[#186E85]"
            >
              <div className="flex flex-col gap-5">
                <h2 className="relative font-bold text-lg mt-1 ml-1 3xl:text-2xl group flex items-center gap-3">
                  <span className="inline-block max-w-fit">{item.title}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ➜
                  </span>
                </h2>
                <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
                  {item.text}
                </p>
              </div>
              <img
                className="absolute top-15 right-0"
                src={`/icons/statistics/${index + 1}.svg`}
                alt="features-statistics-img"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;