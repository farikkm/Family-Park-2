import isMobileUtil from "@/utils/isMobile";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../ui/Title";
import SeeAllButton from "../ui/SeeAllButton";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useTranslation } from "react-i18next";
import { EventsType } from "@/types";
import useIntersection from "@/hooks/useIntersection";

const TIME_SHOW_MODAL = 3000;

const getHref = (path: string, location: ReturnType<typeof useLocation>) => {
  return `${location.pathname}${path}`;
};

function EventsSection() {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const [catalogItems, setCatalogItems] = useState<EventsType[]>([]);
  
  const { request, loading } = useHttp();
  const { isVisible, elementRef } = useIntersection();

  const goToEventPage = (id: number) => {
    navigate(getHref(`event/${id}`, location), { state: {id} });
  }

  useEffect(() => {
    if (!isVisible) return;

    request("/settings/events-list/", "GET", null, { "Accept-Language": `${i18n.resolvedLanguage}` })
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
  }, [i18n.resolvedLanguage, isVisible]);

  return (
    <section id="events" ref={elementRef} className="relative md:pt-30">
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
                    className="mt-5 lg:mt-20"
                  >
                    <>
                      {catalogItems.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          className="w-full rounded-3xl flex items-center justify-center"
                        >
                          <div
                            className="gray-gradient max-w-[380px] w-full p-5 pb-4 block rounded-3xl *:text-black"
                            onClick={() => goToEventPage(item.id)}
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
                          </div>
                        </SwiperSlide>
                      ))}
                    </>
                  </Swiper>
                </>
              )}

              {/* ===== Mobile ===== */}
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 mt-14 *:text-[#25254C] *:max-w-[200px] md:hidden">
                {catalogItems.length > 0 &&
                  catalogItems.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="gray-gradient max-w-[380px] w-full md:p-5 p-3 pb-4 block rounded-3xl *:text-black"
                      onClick={() => goToEventPage(event.id)}
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
                    </div>
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

export default EventsSection;