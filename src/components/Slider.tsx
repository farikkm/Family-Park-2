import { useEffect, useRef, useState } from "react";
// Core modules
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// Additional modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  EffectCoverflow,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Components
import isMobileUtil from "@/utils/isMobile";
import CatalogItem from "./catalog/CatalogItem";

import { CatalogItemsProps } from "@/types";

interface Props {
  type?: string;
  sections?: (() => React.ReactNode)[];
}

const SliderDesktop = ({ sections = [] }: Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [showScrollbar, setShowScrollbar] = useState<boolean>(true);
  const isMobile = isMobileUtil();

  // Листаем к странице после перезагрузки
  useEffect(() => {
    const savedIndex = localStorage.getItem("swiperIndex");
    if (swiperRef.current && savedIndex) {
      swiperRef.current.swiper.slideTo(Number(savedIndex), 0);
    }
  }, []);

  // ScrollBar
  useEffect(() => {
    if (isMobile) setShowScrollbar(false);
  }, [showScrollbar]);

  // Functions
  const scrollUp = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  const scrollDown = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const scrollToTop = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideTo(0);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        simulateTouch={isMobile ? true : false}
        direction="vertical"
        modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: false,
          thresholdDelta: 50,
          thresholdTime: 500,
        }}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={showScrollbar ? { draggable: false, dragSize: 100 } : false}
        pagination={showScrollbar ? false : true}
        className="slider h-screen"
        speed={500}
        onSlideChange={(swiper) => {
          localStorage.setItem("swiperIndex", String(swiper.activeIndex));
        }}
      >
        {sections.map((section: any, index: number) => (
          <SwiperSlide
            key={index}
            className={`flex items-center justify-center`}
          >
            {section}
          </SwiperSlide>
        ))}
      </Swiper>

      {showScrollbar && (
        <div className="absolute right-0 top-0 flex flex-col justify-between items-center translate-y-[28.5%] h-[70vh] z-6">
          <button className="cursor-pointer !p-[7px]" onClick={scrollUp}>
            <img src="/icons/navigation/arrowUp.svg" alt="scrollbar-arrowUp" />
          </button>
          <button className="cursor-pointer !p-[7px]" onClick={scrollDown}>
            <img
              src="/icons/navigation/arrowDown.svg"
              alt="scrollbar-arrowDown"
            />
          </button>
        </div>
      )}

      <div onClick={scrollToTop} className="slider-arrow-up">
        <img
          src="/icons/navigation/accordionArrowDown.svg"
          alt="btn-arrow-up"
          className="rotate-180"
        />
      </div>
    </>
  );
};

const SliderMobile = ({ items = [] }: { items: CatalogItemsProps[] }) => {
  return (
    <div className="hidden md:block relative mt-5 lg:mt-20 _container">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={items.length > 3}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1250: {
            slidesPerView: 3,
            spaceBetween: 50
          },
        }}
        className=""
      >
        {items.length > 0 && items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="w-full rounded-3xl flex items-center justify-center"
          >
            <CatalogItem
              id={item.id}
              img={item.logo}
              catalog={item.tenant_type}
              name={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev absolute left-[-80px]! top-1/2 transform -translate-y-1/2 text-white! bg-black p-8 rounded-full z-10"></div>
      <div className="swiper-button-next right-[-80px]! top-1/2 transform -translate-y-1/2 text-white! bg-black p-8 rounded-full z-10"></div>
    </div>
  );
};

export { SliderDesktop, SliderMobile };
