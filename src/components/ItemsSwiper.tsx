import shopImg from "@/assets/images/shops/shop.png";
import shopImg2 from "@/assets/images/shops/shop4.svg";
import shopImg3 from "@/assets/images/shops/shop2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import CatalogItem from "./catalog/CatalogItem";

const ItemsSwiper = () => {
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

export default ItemsSwiper;
