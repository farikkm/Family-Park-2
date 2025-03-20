import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import StaticHeader from "@/components/header/StaticHeader";
import { SocialMediaIcons } from "@/components/ui/SocialMediaIcons";
import { useHttp } from "@/hooks/useHttp";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { CatalogItemsProps } from "@/types";

const TIME_SHOW_MODAL = 3000;

const Market = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { lng, id } = useParams<{ id: string; lng: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [marketItem, setMarketItem] = useState<CatalogItemsProps>();
  const [otherItems, setOtherItems] = useState<CatalogItemsProps[]>([]);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(
      /(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  };

  // Backend
  const { request, loading } = useHttp();

  useEffect(() => {
    if (id) {
      request(`/tenats/tenats/${id}`, "GET", null, {
        "Accept-Language": `${i18n.resolvedLanguage}`,
      })
        .then((res: CatalogItemsProps) => {
          console.log(res);

          setMarketItem(res);
        })
        .catch(() => {
          setErrorMessage("Информация о заведении отсутствует.");
          setTimeout(() => {
            setErrorMessage("");
          }, TIME_SHOW_MODAL);
        });
    }
  }, [id, i18n.resolvedLanguage]);

  useEffect(() => {
    if (marketItem) {
      request("/tenats/tenats/", "GET", null, {
        "Accept-Language": `${i18n.resolvedLanguage}`,
      }).then((res: CatalogItemsProps[]) => {
        const filteredItems = res.filter((item) => {
          return (
            item.tenant_type.toLowerCase() ===
            marketItem.tenant_type.toLowerCase()
          );
        });
        setOtherItems(filteredItems);
      });
    }
  }, [marketItem, i18n.resolvedLanguage]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : marketItem ? (
        <>
          <StaticHeader />
          <div id="market" className="relative pt-25 md:pt-30">
            <div className="_container">
              <Title text={marketItem.name} />
              <Subtitle
                text={t(`market.${marketItem.tenant_type.toLowerCase()}`)}
              />
              <div className="flex md:flex-row flex-col gap-10">
                <div>
                  <div className="absolute left-0 top-0 w-full h-140 md:h-175 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
                  <div className="mt-3 flex gap-2 md:flex-col">
                    <div className="w-[280px] h-[280px] 3xl:w-[360px] 3xl:h-[350px] flex justify-center items-center rounded-4xl overflow-hidden light-shadow">
                      <img
                        className="w-full h-full object-cover"
                        src={marketItem.logo}
                        alt="shop-img"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-5 *:w-8 *:h-8 3xl:*:w-10 3xl:*:h-10 *:cursor-pointer">
                    <SocialMediaIcons color="white" />
                  </div>
                </div>
                <div>
                  <div className="mt-2 flex flex-col md:*:text-white">
                    <h3 className="text-2xl font-black md:text-3xl 3xl:text-5xl">
                      {t("market.schedule")}
                    </h3>
                    <ul className="my-2 space-y-2 text-xl md:text-2xl 3xl:text-3xl">
                      {marketItem.working_hours?.map((day, index) => (
                        <li
                          key={index}
                          className="flex justify-between border-b pb-1"
                        >
                          <span className="font-semibold">
                            {t(`weekdays.${day.working_day.toLowerCase()}`)}:
                          </span>
                          <span>
                            {day.working_hours_open} - {day.working_hours_close}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-8 text-2xl uppercase font-black md:text-4xl 3xl:text-5xl">
                      {marketItem.phone_number
                        ? formatPhoneNumber(marketItem.phone_number)
                        : "Нет номера"}
                    </span>
                  </div>
                  <div className="mt-20">
                    <h3 className="text-2xl font-bold md:text-3xl 3xl:text-4xl">
                      {t("market.description")}
                    </h3>
                    <p className="text-xl 3xl:text-2xl font-thin md:max-w-[800px]">
                      {marketItem.content
                        ? marketItem.content
                        : "Полное описание"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-20">
                <h4 className="text-xl font-bold">
                  {t("market.shops_you_may_like")}
                </h4>
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <ClipLoader color="#ffffff" size={50} />
                  </div>
                ) : otherItems?.length > 0 ? (
                  <div className="mt-4 mb-5 w-full relative">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={20}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                        },
                        1025: {
                          slidesPerView: 3,
                        },
                        1440: {
                          slidesPerView: 4,
                        },
                      }}
                      className="h-[300px]"
                    >
                      {otherItems
                        .filter(
                          (item) =>
                            item.name.toLowerCase() !==
                            marketItem.name.toLowerCase()
                        )
                        .map((item, index) => (
                          <SwiperSlide
                            key={index}
                            className="h-full  rounded-4xl flex items-center justify-center"
                          >
                            <Link to={`/${lng}/market/${item.id}`}>
                              <img
                                className="h-full border border-slate-400 w-auto object-cover rounded-4xl"
                                src={item.logo}
                                alt="item-img"
                              />
                            </Link>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                ) : (
                  <div className="my-8 flex flex-col space-y-2 justify-center items-center">
                    <p className="text-lg font-bold">
                      {t("market.no_shops_you_may_like")}
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      {t("market.see_other_catalogs")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <img
            src="/icons/not-found/placeholder.svg"
            alt="Not Found"
            className="w-40 h-40 opacity-50 animate-pulse"
          />
          <h2 className="text-3xl font-bold mt-5">
            {t("market.shop_not_found")}
          </h2>
          <p className="text-lg text-gray-500 mt-2">
            {t("market.try_another_shop")}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {t("market.get_back")}
          </button>
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default Market;
