import StaticHeaderBlack from "@/components/header/StaticHeaderBlack";
import Title from "@/components/ui/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { EventsType } from "@/types";

const TIME_SHOW_MODAL = 3000;

const Events = () => {
  const [progress, setProgress] = useState(0);
  const [events, setEvents] = useState<EventsType[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);

  const { i18n, t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState("");

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|v=|\/embed\/|\/v\/|\/e\/|watch\?v=|&v=|\/\?v=)([^#&?]+)/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : "";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Backend
  const { request, loading } = useHttp();

  useEffect(() => {
    request("/settings/events-list/", "GET", null, {
      "Accept-Language": `${i18n.resolvedLanguage}`,
    })
      .then((res: EventsType[]) => {
        console.log(res);

        setEvents(res);
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
    <>
      <StaticHeaderBlack />
      <div id="events" className="pt-30 pb-10 _container">
        <Title
          className="blue-gradient bg-clip-text uppercase text-transparent!"
          text={t("events.title")}
        />
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        ) : (
          <>
            <Swiper
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
              simulateTouch={false}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                setProgress(
                  ((swiper.activeIndex + 1) / swiper.slides.length) * 100
                )
              }
              className="mt-5 max-w-full"
            >
              {events
                .filter((event) => event.status_event)
                .map((event) => (
                  <SwiperSlide key={event.id}>
                    <div>
                      {event.url_events ? (
                        <>
                          {videoLoading && (
                            <div className="absolute bottom-120 inset-0 flex items-center justify-center bg-white">
                              <ClipLoader color="#fa557b" size={80} />
                            </div>
                          )}
                          <iframe
                            className="md:w-full md:h-[600px] md:px-5 w-full px-15 h-[300px]"
                            src={`${getYoutubeEmbedUrl(event.url_events)}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen={true}
                            onLoad={() => setVideoLoading(false)}
                          ></iframe>
                        </>
                      ) : (
                        <img
                          src={`${event.image_events}`}
                          alt={`${event.title}`}
                        />
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <h3 className="red-gradient mt-3 text-2xl md:text-4xl font-bold uppercase drop-shadow-2xl bg-clip-text text-transparent">
                          {formatDate(event.event_data)}
                        </h3>
                        <div className="flex gap-1">
                            <strong className="red-gradient bg-clip-text text-transparent text-3xl">{event.time_events_start}</strong>
                            <span className="red-gradient bg-clip-text text-transparent text-3xl">-</span>
                            <strong className="red-gradient bg-clip-text text-transparent text-3xl">{event.time_events_end}</strong>
                        </div>
                      </div>

                      <h2 className="blue-gradient mt-5 text-3xl md:text-5xl font-black uppercase drop-shadow-2xl text-transparent bg-clip-text">
                        {event.title}
                      </h2>
                      <p className="mt-2 uppercase text-xl md:text-3xl md:mt-3">
                        {event.location}
                      </p>
                      <p className="mt-5 font-bold text-2xl md:text-4xl text-[#343464] uppercase">
                        {event.subtitles}
                      </p>
                      <p className="mb-5 md:text-lg">{event.context}</p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="md:fixed absolute top-1/2 left-0 right-0 flex justify-between px-5 pointer-events-none">
              <button className="swiper-button-prev pointer-events-auto text-white! rounded-full p-7 bg-[#2C2D58]"></button>
              <button className="swiper-button-next pointer-events-auto text-white! rounded-full p-7 bg-[#2C2D58]"></button>
            </div>
            <div className="fixed bottom-0 left-0 w-full h-3 bg-gray-300">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {errorMessage && (
              <div className="fixed top-30 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                {errorMessage}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Events;
