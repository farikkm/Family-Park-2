import { SliderDesktop, SliderMobile } from "@/components/Slider";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

import isMobileUtil from "@/utils/isMobile";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import { useTranslation } from "react-i18next";
import { Suspense, useEffect, useState } from "react";
import getHref from "@/utils/getHref";
import SeeAllButton from "@/components/ui/SeeAllButton";
import CatalogItems from "@/components/catalog/CatalogItems";
import Footer from "@/components/footer/Footer";

// Images
import heroImg from "@/assets/images/hero.png";
import heroImgDesktop from "@/assets/images/hero/img.png";
import heroLogo from "@/assets/images/hero/logo.png";

// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SendButton from "@/components/ui/SendButton";
import ResponsiveHeader from "@/components/header/ResponsiveHeader";
import LINKS from "@/utils/links";
import { CatalogItemsProps, EventsType } from "@/types";
import { useHttp } from "@/hooks/useHttp";
import { ClipLoader } from "react-spinners";
import filterByStatus from "@/utils/filterByStatus";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HOME_PAGE_CATEGORIES = {
  SHOP: "shop",
  FOOD: "food",
  ENTERTAINMENT: "entertainment",
  EVENTS: "events",
};

const TIME_SHOW_MODAL = 3000;

// =================================== HOME PAGE =================================== //

const Home = () => {
  let sections = [
    Hero,
    Statistics,
    Shops,
    Foods,
    Entartainments,
    EventsSection,
    Tenant,
    Footer,
  ];

  const { t } = useTranslation();

  return (
    <>
      <ResponsiveHeader />
      <main id="home" className="home mt-20 md:mt-0">
        {sections && <SliderDesktop sections={sections} />}
      </main>
      <div className="buttons hidden md:flex fixed bottom-7 right-27 z-6 gap-3">
        <Button path={getHref("lost-item")}>{t("home.button1")}</Button>
        <Button path={getHref("/hr")} bg="blue">
          {t("home.button2")}
        </Button>
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
        <div className="hero-img min-w-[100px] w-full h-65 md:h-130 3xl:h-190 overflow-hidden">
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
            <span className="block text-4xl xs:text-5xl md:text-6xl 3xl:text-8xl 2xl:text-7xl  drop-shadow-2xl bg-gradient-to-br from-[#6A6DBD] to-[#25254C] text-transparent bg-clip-text">
              {t("home.hero.title1")}
            </span>
            <span className="bg-gradient-to-b text-4xl xs:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl  drop-shadow-2xl from-[#fa557b] to-[#bb2649] bg-clip-text text-transparent md:ml-[60px]">
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
          className="statistics-bottom my-5 grid grid-cols-2 md:grid-cols-4 max-w-[400px] 
        md:max-w-[1100px] 3xl:max-w-[1100px] 3xl:md:h-100 md:h-55 mx-auto rounded-4xl 
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

function Shops() {
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);

  const { request, loading } = useHttp();

  useEffect(() => {
    request("/tenats/tenats/", "GET", null)
      .then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter(
          (item) => item.tenant_type.toLowerCase() === HOME_PAGE_CATEGORIES.SHOP
        );

        setCatalogItems(filterByStatus(filteredItems));
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage]);

  return (
    <section id="shops" className="relative md:pt-30">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="_container">
        <div className="shops__content py-5 md:py-5 text-white">
          <div className="md:flex flex-col lg:flex-row items-center justify-between">
            <Title text={t("home.shop.title")} />
            <SeeAllButton link={LINKS.CATEGORY.SHOPS} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : catalogItems.length > 0 ? (
            <>
              {/* ===== Desktop ===== */}
              {!isMobileUtil() && <SliderMobile items={catalogItems} />}
              {/* ===== Mobile ===== */}
              <CatalogItems items={catalogItems} />
            </>
          ) : (
            <p className="flex justify-center items-center my-15 font-bold text-2xl sm:text-3xl">
              Данные не найдены
            </p>
          )}

          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Foods() {
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);

  const { request, loading } = useHttp();

  useEffect(() => {
    request("/tenats/tenats/", "GET", null)
      .then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter(
          (item) => item.tenant_type.toLowerCase() === HOME_PAGE_CATEGORIES.FOOD
        );

        setCatalogItems(filterByStatus(filteredItems));
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage]);

  return (
    <section id="food" className="relative md:pt-30">
      {/* Decor */}
      <div className="red-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="_container">
        <div className="shops__content py-5 md:py-5 text-white">
          <div className="md:flex flex-col lg:flex-row items-center justify-between">
            <Title text={t("home.food.title")} />
            <SeeAllButton link={LINKS.CATEGORY.FOOD} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : catalogItems.length > 0 ? (
            <>
              {/* ===== Desktop ===== */}
              {!isMobileUtil() && <SliderMobile items={catalogItems} />}
              {/* ===== Mobile ===== */}
              <CatalogItems items={catalogItems} />
            </>
          ) : (
            <p className="flex justify-center items-center my-15 font-bold text-2xl sm:text-3xl">
              Данные не найдены
            </p>
          )}

          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Entartainments() {
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<CatalogItemsProps[]>([]);

  const { request, loading } = useHttp();

  useEffect(() => {
    request("/tenats/tenats/", "GET", null)
      .then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter(
          (item) =>
            item.tenant_type.toLowerCase() ===
            HOME_PAGE_CATEGORIES.ENTERTAINMENT
        );

        setCatalogItems(filterByStatus(filteredItems));
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage]);

  return (
    <section id="entartainments" className="relative md:pt-30">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="_container">
        <div className="shops__content py-5 md:py-5 text-white">
          <div className="md:flex flex-col lg:flex-row items-center justify-between">
            <Title text={t("home.entertainment.title")} />
            <SeeAllButton link={LINKS.CATEGORY.ENTERTAINMENT} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : catalogItems.length > 0 ? (
            <>
              {/* ===== Desktop ===== */}
              {!isMobileUtil() && <SliderMobile items={catalogItems} />}
              {/* ===== Mobile ===== */}
              <CatalogItems items={catalogItems} />
            </>
          ) : (
            <p className="flex justify-center items-center my-15 font-bold text-2xl sm:text-3xl">
              Данные не найдены
            </p>
          )}

          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const { i18n, t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<EventsType[]>([]);

  const eventLink = getHref(`/events/`);

  const { request, loading } = useHttp();

  useEffect(() => {
    request("/settings/events-list/", "GET", null)
      .then((res: EventsType[]) => {
        setCatalogItems(res);
      })
      .catch(() => {
        setErrorMessage(
          "Произошла непредвиденная ошибка. Перезагрузите страницу."
        );
        setTimeout(() => {
          setErrorMessage("");
        }, TIME_SHOW_MODAL);
      });
  }, [i18n.resolvedLanguage]);

  return (
    <section id="entartainments" className="relative md:pt-30">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="_container">
        <div className="shops__content py-5 md:py-5 text-white">
          <div className="md:flex flex-col lg:flex-row items-center justify-between">
            <Title text={t("home.events.title")} />
            <SeeAllButton link={"/events/"} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : catalogItems.length > 0 ? (
            <>
              {/* ===== Desktop ===== */}
              {!isMobileUtil() && (
                <>
                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      EffectCoverflow,
                      Autoplay,
                    ]}
                    navigation={false}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: true,
                    }}
                    loop={true}
                    speed={1000} // Плавная прокрутка (1 секунда)
                    effect="slide"
                    centeredSlides={true}
                    slidesPerView={3}
                    spaceBetween={20}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                      },
                      991: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                      1250: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                      },
                    }}
                    className="mt-20"
                  >
                    <>
                      {catalogItems.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          className="w-full rounded-3xl flex items-center justify-center"
                        >
                          <Link
                            className="gray-gradient max-w-[380px] w-full p-5 pb-4 block rounded-3xl *:text-black"
                            to={getHref(`/events/`)}
                          >
                            <div className=" h-[150px] xs:h-[170px] sm:h-[220px] md:h-[280px] 2xl:h-[300px] 3xl:h-[350px] overflow-hidden rounded-3xl">
                              <img
                                src={item.image_events}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <span className="block mt-2 font-bold text-lg sm:text-xl md:text-2xl truncate overflow-hidden whitespace-nowrap">
                              {item.title ? item.title : "Название заведения"}
                            </span>
                            <span className="text-base">
                              {item.media ? item.media : "Категория заведения"}
                            </span>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </>
                  </Swiper>
                </>
              )}
              {/* ===== Mobile ===== */}
              {/* <CatalogItems items={catalogItems} /> */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 mt-14 *:text-[#25254C] *:max-w-[200px] md:hidden">
                {catalogItems.length > 0 &&
                  catalogItems.slice(0, 2).map((event) => (
                    <Link
                      key={event.id}
                      className="gray-gradient max-w-[380px] w-full md:p-5 p-3 pb-4 block rounded-3xl *:text-black"
                      to={eventLink}
                    >
                      <div className=" h-[150px] xs:h-[170px] sm:h-[220px] md:h-[280px] 2xl:h-[300px] 3xl:h-[350px] overflow-hidden rounded-3xl">
                        <img
                          src={event.image_events}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="block mt-2 font-bold text-lg sm:text-xl md:text-2xl truncate overflow-hidden whitespace-nowrap">
                        {event.title ? event.title : "Название заведения"}
                      </span>
                      <span className="text-base">
                        {event.media ? event.media : "Категория заведения"}
                      </span>
                    </Link>
                  ))}
              </div>
            </>
          ) : (
            <p className="flex justify-center items-center my-15 font-bold text-2xl sm:text-3xl">
              Данные не найдены
            </p>
          )}

          {errorMessage && (
            <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

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
