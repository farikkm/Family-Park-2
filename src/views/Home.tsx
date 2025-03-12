import { SliderDesktop, SliderMobile } from "@/components/Slider";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

import isMobileUtil from "@/utils/isMobile";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import getHref from "@/utils/getHref";
import SeeAllButton from "@/components/ui/SeeAllButton";
import CatalogItems from "@/components/catalog/CatalogItems";
import Footer from "@/components/footer/Footer";

// Images
import heroImg from "@/assets/images/hero.png";
import heroImgDesktop from "@/assets/images/hero/img.png";
import heroLogo from "@/assets/images/hero/logo.png";
import shopImg from "@/assets/images/shops/shop.png";

// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SendButton from "@/components/ui/SendButton";
import ResponsiveHeader from "@/components/header/ResponsiveHeader";

// =================================== HOME PAGE =================================== //

const Home = () => {
  let sections;
  const { t } = useTranslation();
  let isMobile = isMobileUtil();

  if (isMobile) {
    sections = [Hero, Statistics, Shops, Tenant, Footer];
  } else {
    sections = [
      Hero,
      Statistics,
      Shops,
      Foods,
      Entartainments,
      EventsSection,
      Tenant,
      Footer,
    ];
  }

  return (
    <>
      <ResponsiveHeader />
      <main id="home" className="home mt-20 md:mt-0">
        {sections && <SliderDesktop sections={sections} />}
      </main>
      <div className="buttons hidden md:flex fixed bottom-7 right-27 z-6  gap-3 *:w-[150px] 3xl:*:w-[200px] *:text-left *:active:scale-110">
        <Link to={getHref("lost-item")}>
          <Button className="3xl:text-[15px]">{t("home.button1")}</Button>
        </Link>
        <Link to={getHref("/hr")}>
          <Button bg="blue" className="3xl:text-[15px] px-2!">
            {t("home.button2")}
          </Button>
        </Link>
      </div>
    </>
  );
};

// =================================== SECTIONS =================================== //

function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="hero"
        className="block md:flex md:gap-30 flex-row-reverse justify-between items-center md:px-20 md:pt-10"
      >
        <div className="hero-img min-w-[100px] w-full h-65 md:h-150 3xl:h-190 overflow-hidden">
          <img
            className="block md:hidden w-full h-full object-cover"
            src={heroImg}
            alt="hero-img"
          />
          <img
            className="md:block max-w-full hidden h-full w-full object-cover rounded-4xl"
            src={heroImgDesktop}
            alt="hero-img"
          />
        </div>
        <div className="hero-content md:max-w-[700px] 3xl:max-w-[900px] w-full py-5 px-5 md:pr-6 md:pl-20">
          <h2 className="font-black *:uppercase">
            <img
              src={heroLogo}
              alt="hero-logo"
              className="hidden md:inline-block mb-7 pointer-events-none"
            />
            <span className="block 3xl:text-8xl 2xl:text-7xl text-[50px]/[50px] drop-shadow-2xl bg-gradient-to-br from-[#6A6DBD] to-[#25254C] text-transparent bg-clip-text">
              {t("home.hero.title1")}
            </span>
            <span className="bg-gradient-to-b 2xl:text-7xl 3xl:text-8xl text-[50px]/[50px] drop-shadow-2xl from-[#fa557b] to-[#bb2649] bg-clip-text text-transparent md:ml-[60px]">
              {t("home.hero.title2")}
            </span>
          </h2>
          <p className="mt-5 md:mt-10 mb-8 text-sm md:text-xl 3xl:text-2xl md:max-w-[460px] 3xl:max-w-[600px] ">
            {t("home.hero.subtitle")}
          </p>
        </div>
      </section>
    </>
  );
}

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
          className="statistics-bottom my-8 md:my-9 grid grid-cols-2 max-w-[400px] 
        md:max-w-[800px] 3xl:max-w-[1100px] 3xl:md:h-100 md:h-85 md:mt-15 mx-auto rounded-4xl 
        overflow-hidden *:text-white"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="relative p-3 pr-10 h-auto nth-[1]:bg-[#FD7824] nth-[2]:bg-[#CF3559] nth-[3]:bg-[#8A6ABD] nth-[4]:bg-[#186E85]"
            >
              <div className="flex flex-col gap-5">
                <h2 className="font-bold text-lg mt-1 ml-1 3xl:text-2xl">
                  {item.title}
                </h2>
                <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
                  {item.text}
                </p>
              </div>
              <img
                className="absolute top-10 right-0"
                src={`/icons/statistics/${index + 1}.svg`}
                alt="features-statistics-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shops() {
  const { t } = useTranslation();

  const items = [
    { id: 1, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 2, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 3, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 4, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
  ];

  return (
    <section id="shops" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text={t("home.shops.title")} />
          <SeeAllButton category="shops" />
        </div>

        {/* ===== Desktop ===== */}
        {!isMobileUtil() && <SliderMobile />}
        {/* ===== Mobile ===== */}
        <CatalogItems items={items} className="mt-5" />
      </div>
    </section>
  );
}

function Foods() {
  const { t } = useTranslation();

  const items = [
    { id: 1, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 2, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 3, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 4, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
  ];

  return (
    <section id="foods" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="red-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text={t("home.food.title")} />
          <SeeAllButton category="food" />
        </div>

        {/* ===== Desktop ===== */}
        {!isMobileUtil() && <SliderMobile />}
        {/* ===== Mobile ===== */}
        <CatalogItems items={items} className="mt-5" />
      </div>
    </section>
  );
}

function Entartainments() {
  const { t } = useTranslation();

  const items = [
    { id: 1, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 2, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 3, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 4, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
  ];

  return (
    <section id="entartainments" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text={t("home.entertainment.title")} />
          <SeeAllButton category="entartainment" />
        </div>

        {/* ===== Desktop ===== */}
        {!isMobileUtil() && <SliderMobile />}
        {/* ===== Mobile ===== */}
        <CatalogItems items={items} className="mt-5" />
      </div>
    </section>
  );
}

function EventsSection() {
  const { t } = useTranslation();

  const items = [
    { id: 1, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 2, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 3, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
    { id: 4, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
  ];
  return (
    <section id="events" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="red-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text={t("home.events.title")} />
          <SeeAllButton category="events" />
        </div>

        {/* ===== Desktop ===== */}
        {!isMobileUtil() && <SliderMobile />}
        {/* ===== Mobile ===== */}
        <CatalogItems items={items} className="mt-5" />
      </div>
    </section>
  );
}

// function Sales() {
//   const { t } = useTranslation();

//   const items = [
//     { id: 1, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
//     { id: 2, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
//     { id: 3, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
//     { id: 4, img: shopImg, catalogVar: "Продукты", nameVar: "Carrefour" },
//   ];
//   return (
//     <section id="sales" className="relative md:pt-30 md:px-35">
//       {/* Decor */}
//       <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
//       {/* Content */}
//       <div className="shops__content py-5 px-5 text-white">
//         <div className="md:flex items-center justify-between">
//           <Title text={t("home.sales.title")} />
//           <SeeAllButton />
//         </div>

//         {/* ===== Desktop ===== */}
//         {!isMobileUtil() && <SliderMobile />}
//         {/* ===== Mobile ===== */}
//         <CatalogItems items={items} className="mt-5" />
//       </div>
//     </section>
//   );
// }

function Tenant() {
  const { t } = useTranslation();

  const tenantTypes = t("tenant.types", {
    returnObjects: true,
  }) as Record<string, string>;

  return (
    <div id="tenant" className="pb-20 pt-5 px-5 relative md:pt-30 md:px-35">
      <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
      <div className="*:text-white">
        <Title className="uppercase!" text={t("home.tenant.title")} />
        <Subtitle text={t("home.tenant.subtitle")} />
      </div>
      <div className="mt-15 md:mt-10 md:max-w-4xl 3xl:max-w-5xl md:mx-auto">
        <form
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
            <Link to={getHref("/tenant")}>
              <SendButton />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function HomeWrapper() {
  return (
    <Suspense fallback="loading...">
      <Home />
    </Suspense>
  );
}
