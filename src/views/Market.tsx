import { Swiper, SwiperSlide } from "swiper/react";
import Header from "@/components/Header";

import "swiper/css";

import shopImg from "@/assets/images/shops/shop.png";
import shopImg2 from "@/assets/images/shops/shop2.png";
import { useEffect } from "react";
import isMobileUtil from "@/utils";

const Market = () => {
  useEffect(() => {
    document.body.removeAttribute("style");
  }, []);

  let isMobile = isMobileUtil()

  // const {request} = useHttp()

  return (
    <>
      <Header icons="white" />
      <div id="market" className="relative pt-30 px-5 md:px-40">
        <h1 className="text-white text-5xl md:text-7xl font-black mb-1">
          Carrefour
        </h1>
        <span className="text-white text-3xl font-normal">Магазины</span>
        <div className="flex md:flex-row flex-col gap-10">
          <div>
            <div className="absolute left-0 top-0 w-full h-95 -z-1 bg-gradient-to-br from-[#25254C] to-[#6A6DBD]" />
            <div className="mt-3 flex gap-2 md:flex-col">
              <div className="w-[280px] h-[280px] flex justify-center items-center rounded-4xl overflow-hidden shadow-xs shadow-black">
                <img
                  className="w-full h-full object-cover"
                  src={shopImg}
                  alt="shop-img"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-[86px] h-[86px] flex justify-center items-center rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={shopImg}
                    alt="shop-img"
                  />
                </div>
                <div className="w-[86px] h-[86px] flex justify-center items-center rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={shopImg}
                    alt="shop-img"
                  />
                </div>
                <div className="w-[86px] h-[86px] flex justify-center items-center rounded-2xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={shopImg}
                    alt="shop-img"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-5 *:w-8 *:h-8 *:cursor-pointer">
              <img src="/icons/instagram.svg" alt="instagram-icon" />
              <img src="/icons/telegram.svg" alt="telegram-icon" />
              <img src="/icons/youtube.svg" alt="youtube-icon" />
              <img src="/icons/facebook.svg" alt="facebook-icon" />
              <img src="/icons/tiktok.svg" alt="tiktok-icon" />
            </div>
          </div>
          <div>
            <div className="mt-2 flex flex-col md:*:text-white">
              <h3 className="text-2xl font-black md:text-3xl">Режим работы</h3>
              <span className="text-xl font-thin md:text-3xl mb-7 inline-block">
                10:00-23:00{" "}
              </span>
              <span className="text-xl font-thin md:text-3xl">
                +998 91 123 45 67{" "}
              </span>
            </div>
            <div className="mt-4 ">
              <h3 className="text-2xl font-bold md:text-3xl">Описание:</h3>
              <p className="text-xl font-thin md:max-w-[800px]">
                Carrefour SA (с фр. — «перекрёсток», произносится Карфу́р) —
                французская компания розничной торговли, оператор одноимённой
                розничной сети.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-20">
          <h4 className="text-xl font-bold">
            Также вас может заинтересовать:
          </h4>
          <div className="mt-4 mb-5 w-full h-auto! md:h-[300px]! relative overflow-hidden">
            <Swiper
              className="h-full"
              slidesPerView={isMobile ? 1.8 : 4}
              spaceBetween={20}
              centeredSlides={false}
            >
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
              <SwiperSlide className="rounded-4xl overflow-hidden drop-shadow-xl">
                <img className="w-full h-full" src={shopImg2} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
