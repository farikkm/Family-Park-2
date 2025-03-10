import { useEffect, useRef, useState } from "react";
// Core modules
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// Additional modules
import { Navigation, Pagination, Scrollbar, Mousewheel } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Button from "./ui/Button";
import isMobileUtil from "@/utils";

interface Props {
  sections: (() => React.ReactNode)[];
}

const Slider = ({ sections }: Props) => {
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
            <img src="/icons/arrowUp.svg" alt="scrollbar-arrowUp" />
          </button>
          <button className="cursor-pointer !p-[7px]" onClick={scrollDown}>
            <img src="/icons/arrowDown.svg" alt="scrollbar-arrowDown" />
          </button>
        </div>
      )}

      <Button onClick={scrollToTop} className="hidden md:block fixed bottom-7 right-8 px-4! w-14 h-14 z-6 3xl:w-18 3xl:px-6! 3xl:h-18 3xl:rounded-[50px] active:scale-110" bg="blue">
        <img src="/icons/btnArrowUp.png" alt="btn-arrow-up" />
      </Button>
    </>
  );
};

export default Slider;
