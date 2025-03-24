import StaticHeaderBlack from "@/components/header/StaticHeaderBlack";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import getHref from "@/utils/getHref";
import { EventsType } from "@/types";
import { useHttp } from "@/hooks/useHttp";

const TIME_SHOW_MODAL = 3000;

const Event = () => {
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventsType>();

  const { i18n } = useTranslation();

  const eventsLink = getHref("/events/");

  const { request, loading } = useHttp();

  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    request(`/settings/events-list/${id}`, "GET", null, {
      "Accept-Language": `${i18n.resolvedLanguage}`,
    })
    .then((res: EventsType) => {
      setEvent(res);
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

    const [videoLoading, setVideoLoading] = useState(true);
    
    const getYoutubeEmbedUrl = (url: string) => {
      const videoIdMatch = url.match(
      /(?:youtu\.be\/|v=|\/embed\/|\/v\/|\/e\/|watch\?v=|&v=|\/\?v=)([^#&?]+)/
    );
    return videoIdMatch
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
    : "";
  };

  const formatDate = (dateString: string, locale: "ru" | "en" | "uz") => {
    const date = new Date(dateString);
    
    const locales: Record<string, string> = {
      ru: "ru-RU",
      en: "en-US",
    };
    
    if (locale === "uz") {
      const monthsUz = [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avgust",
        "sentabr",
        "oktabr",
        "noyabr",
        "dekabr",
      ];
      return `${date.getDate()} ${
        monthsUz[date.getMonth()]
      } ${date.getFullYear()}`;
    }
    
    return new Intl.DateTimeFormat(locales[locale] || "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Событие не найдено
        </h2>
        <p className="text-gray-600 mt-2">
          Возможно, оно было удалено или ссылка неверна.
        </p>
        <Link
          to={eventsLink}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Вернуться к событиям
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <StaticHeaderBlack />
      <div id="event" className="pt-30 pb-10 _container">
        <div className="mt-5 max-w-full">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : event ? (
            <>
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
                <img src={`${event.image_events}`} alt={`${event.title}`} />
              )}

              <div className="flex justify-between items-center mt-4">
                <h3 className="red-gradient mt-3 text-2xl md:text-4xl font-bold uppercase drop-shadow-2xl bg-clip-text text-transparent">
                  {formatDate(
                    event.event_data,
                    i18n.language as "ru" | "en" | "uz"
                  )}
                </h3>
                <div className="flex gap-1">
                  <strong className="red-gradient bg-clip-text text-transparent text-3xl">
                    {event.time_events_start}
                  </strong>
                  <span className="red-gradient bg-clip-text text-transparent text-3xl">
                    -
                  </span>
                  <strong className="red-gradient bg-clip-text text-transparent text-3xl">
                    {event.time_events_end}
                  </strong>
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
    </>
  );
};

export default Event;
