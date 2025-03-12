import { useEffect, useRef, useState } from "react";
// Core modules
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// Additional modules
import { Navigation, Pagination, Scrollbar, Mousewheel, EffectCoverflow } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Button from "./ui/Button";
import isMobileUtil from "@/utils";
import CatalogItem from "./catalog/CatalogItem";

// Images
import shopImg from "@/assets/images/shops/shop.png";
import shopImg2 from "@/assets/images/shops/shop4.svg";
import shopImg3 from "@/assets/images/shops/shop2.png";

interface Props {
  type?: string;
  sections?: (() => React.ReactNode)[];
}

const SliderDesktop = ({ sections = [] }: Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [showScrollbar, setShowScrollbar] = useState<boolean>(true);
  const isMobile = isMobileUtil()

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
  }

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
          <SwiperSlide key={index} className={`flex items-center justify-center`}>{section}</SwiperSlide>
        ))}
      </Swiper>

      {showScrollbar && (
        <div className="absolute right-0 top-0 flex flex-col justify-between items-center translate-y-[28.5%] h-[70vh] z-6">
          <button className="cursor-pointer !p-[7px]" onClick={scrollUp}>
            <img src="/icons/navigation/arrowUp.svg" alt="scrollbar-arrowUp" />
          </button>
          <button className="cursor-pointer !p-[7px]" onClick={scrollDown}>
            <img src="/icons/navigation/arrowDown.svg" alt="scrollbar-arrowDown" />
          </button>
        </div>
      )}

      <Button onClick={scrollToTop} className="hidden md:block fixed bottom-7 right-8 px-4! w-14 h-14 z-6 3xl:w-18 3xl:px-6! 3xl:h-18 3xl:rounded-[50px] active:scale-110" bg="blue">
        <img src="/icons/navigation/btnArrowUp.png" alt="btn-arrow-up" />
      </Button>
    </>
  );
};

const SliderMobile = () => {
  return (
    <div className="hidden md:block relative md:mt-20 w-full max-w-6xl 3xl:max-w-[1500px] mx-auto">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={100}
        coverflowEffect={{
          rotate: 0,
          stretch: 30,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        className="w-full"
      >
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg3} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg2} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg2} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg3} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg2} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg3} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg2} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-auto overflow-hidden rounded-3xl">
          <CatalogItem img={shopImg3} catalog="Продукты" name="Carrefour" />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-prev absolute left-[-80px]! top-1/2 transform -translate-y-1/2 text-white! bg-black p-8 rounded-full z-10"></div>
      <div className="swiper-button-next right-[-80px]! top-1/2 transform -translate-y-1/2 text-white! bg-black p-8 rounded-full z-10"></div>
    </div>
  );
};

export { SliderDesktop, SliderMobile }