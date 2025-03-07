import Slider from "@/components/Slider";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import CatalogItem from "@/components/CatalogItem";

// Images
import heroImg from "@/assets/images/hero.png";
import heroImgDesktop from "@/assets/images/hero/img.png";
import heroLogo from "@/assets/images/hero/logo.png";
import shopImg from "@/assets/images/shops/shop.png";
import img1 from "@/assets/images/statistics/1.svg";
import img2 from "@/assets/images/statistics/2.svg";
import img3 from "@/assets/images/statistics/3.svg";
import img4 from "@/assets/images/statistics/4.svg";

// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ItemsSwiper from "@/components/ItemsSwiper";
import isMobileUtil from "@/utils";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";


// =================================== HOME PAGE =================================== //

const Home = () => {
  let sections;
  let isMobile = isMobileUtil();
  
  if (isMobile) {
    sections = [Hero, Statistics, Shops, Tenant, Footer];
  } else {
    sections = [
      Hero,
      Statistics,
      Shops,
      Foods,
      Entartainments,
      EventsSection,
      Sales,
      Tenant,
      FooterDesktop,
    ];
  }
  
  return (
    <>
      <Header className="bg-transparent!" />
      <main id="home" className="home mt-25 md:mt-0">
        {sections && <Slider sections={sections} />}
      </main>
      <div className="buttons hidden md:flex fixed bottom-7 right-27 z-6  gap-3 *:w-[150px] 3xl:*:w-[200px] *:text-left *:active:scale-110">
        <Link to='/lost-item'>
          <Button className="3xl:text-[15px]">Потерянные вещи</Button>
        </Link>
        <Link to="/hr">
          <Button bg="blue" className="3xl:text-[15px]">Работа в Family Park</Button>
        </Link>
      </div>
    </>
  );
};

// =================================== SECTIONS =================================== //

function Hero() {
  return (
    <>
      <section
        id="hero"
        className="block md:flex md:gap-30 flex-row-reverse justify-between items-center md:px-20 md:pt-10"
      >
        <div className="hero-img min-w-[100px] w-full h-65 md:h-150 3xl:h-190 overflow-hidden">
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
          <h2 className="text-5xl md:text-7xl font-black *:uppercase">
            <img
              src={heroLogo}
              alt="hero-logo"
              className="hidden md:inline-block mb-7 pointer-events-none"
            />
            <span className="block 3xl:text-8xl 2xl:text-7xl text-6xl drop-shadow-2xl bg-gradient-to-br from-[#6A6DBD] to-[#25254C] text-transparent bg-clip-text">
              Место где,
            </span>
            <span className="bg-gradient-to-b 3xl:text-8xl 2xl:text-7xl text-6xl drop-shadow-2xl from-[#fa557b] to-[#bb2649] bg-clip-text text-transparent ml-[60px]">
              Вас любят
            </span>
          </h2>
          <p className="mt-5 md:mt-10 mb-8 text-sm md:text-xl 3xl:text-2xl md:max-w-[460px] 3xl:max-w-[600px] ">
            Самый крупный ТРЦ в Самарканде. Место где вы и ваши близкие получите
            бурю эмоций и незабываемые дни, только у нас в FAMILY PARK!
          </p>
        </div>
      </section>
    </>
  );
}

function Statistics() {
  return (
    <section id="statistics" className="z-20">
      <div className="red-gradient statistics-top py-7 px-5 text-white md:pt-30 3xl:pt-35 3xl:pb-15 ">
        <h2 className="text-4xl 3xl:text-5xl max-w-sm  mx-auto text-center md:max-w-full">
          ОТКРОЙТЕ <span className="font-black">МИР РАЗВЛЕЧЕНИЙ</span> ТОЛЬКО{" "}
          <span className="font-black">У НАС</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4 md:mt-8 md:max-w-4xl md:mx-auto md:grid-cols-4">
          <div>
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              80+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              Магазинов, ресторанов и развлечений
            </span>
          </div>
          <div>
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              10+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              Развлекательных точек
            </span>
          </div>
          <div className="hidden md:block">
            <h3 className="text-4xl 3xl:text-6xl font-bold md:font-black md:mb-2 md:text-5xl">
              20+{" "}
            </h3>
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              Мировых брендов{" "}
            </span>
          </div>
          <div className="hidden md:block md:max-w-[300px]">
            <span className="text-sm font-normal md:text-md 3xl:text-[16px]">
              Хотите быть всегда на стиле? Крупные мировые бренды отлично
              подберут вам лук на сезон!
            </span>
          </div>
        </div>
      </div>
      <div className="statistics-bottom my-4 md:my-9 grid grid-cols-2 max-w-[400px] md:max-w-[800px] 3xl:max-w-[1100px] 3xl:md:h-100 md:h-80 md:mt-15 mx-auto rounded-4xl overflow-hidden *:text-white">
        <div className="relative p-3 pr-10 bg-[#FD7824] h-auto">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg mt-1 ml-1 3xl:text-2xl">Развлечения</h2>
            <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
              Ледовый каток, Картинг, Боулинг, Кинотеатр, где можно весело
              провести время с друзьями и семьей
            </p>
          </div>
          <img
            className="absolute top-10 right-0"
            src={img1}
            alt="features-statistics-img"
          />
        </div>
        <div className="relative p-3 pr-10 bg-[#CF3559] h-auto">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg mt-1 ml-1 3xl:text-2xl">Развлечения</h2>
            <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
              Ледовый каток, Картинг, Боулинг, Кинотеатр, где можно весело
              провести время с друзьями и семьей
            </p>
          </div>
          <img
            className="absolute top-10 right-0"
            src={img2}
            alt="features-statistics-img"
          />
        </div>
        <div className="relative p-3 pr-10 bg-[#8A6ABD] h-auto">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg mt-1 ml-1 3xl:text-2xl">Развлечения</h2>
            <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
              Ледовый каток, Картинг, Боулинг, Кинотеатр, где можно весело
              провести время с друзьями и семьей
            </p>
          </div>
          <img
            className="absolute top-10 right-0"
            src={img3}
            alt="features-statistics-img"
          />
        </div>
        <div className="relative p-3 pr-10 bg-[#186E85] h-auto">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-lg mt-1 ml-1 3xl:text-2xl">Развлечения </h2>
            <p className="min-w-[180px] text-xs md:text-[14px] md:max-w-[280px] 3xl:text-base">
              Ледовый каток, Картинг, Боулинг, Кинотеатр, где можно весело
              провести время с друзьями и семьей
            </p>
          </div>
          <img
            className="absolute top-10 right-0"
            src={img4}
            alt="features-statistics-img"
          />
        </div>
      </div>
    </section>
  );
}

function Shops() {
  return (
    <section id="shops" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text="Магазины"/>
          <Link
            to={"/catalog"}
            className="see-all"
          >
            Посмотреть все
          </Link>
        </div>

        {!isMobileUtil() && <ItemsSwiper />}

        <div className="mt-5 grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </div>
      </div>
    </section>
  );
}

function Foods() {
  return (
    <section id="foods" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="red-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text="Еда" />
          <Link
            to={"/catalog"}
            className="see-all"
          >
            Посмотреть все
          </Link>
        </div>

        {!isMobileUtil() && <ItemsSwiper />}

        <div className="mt-5 grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </div>
      </div>
    </section>
  );
}

function Entartainments() {
  return (
    <section id="entartainments" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text="Развлечения" />
          <Link
            to={"/catalog"}
            className="see-all"
          >
            Посмотреть все
          </Link>
        </div>

        {!isMobileUtil() && <ItemsSwiper />}

        <div className="mt-5 grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section id="events" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="red-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text="События" />
          <Link
            to={"/catalog"}
            className="see-all"
          >
            Посмотреть все
          </Link>
        </div>

        {!isMobileUtil() && <ItemsSwiper />}

        <div className="mt-5 grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </div>
      </div>
    </section>
  );
}

function Sales() {
  return (
    <section id="sales" className="relative md:pt-30 md:px-35">
      {/* Decor */}
      <div className="blue-gradient absolute left-0 top-0 w-full h-90 -z-1" />
      {/* Content */}
      <div className="shops__content py-5 px-5 text-white">
        <div className="md:flex items-center justify-between">
          <Title text="Акции и скидки"/>
          <Link
            to={"/catalog"}
            className="see-all"
          >
            Посмотреть все
          </Link>
        </div>

        {!isMobileUtil() && <ItemsSwiper />}

        <div className="mt-5 grid gap-2 gap-y-4 grid-cols-2 sm:grid-cols-3 *:text-[#25254C] *:max-w-[200px] md:hidden">
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
          <CatalogItem img={shopImg} catalog="Продукты" name="Carrefour" />
        </div>
      </div>
    </section>
  );
}

function Tenant() {
  let isMobile = isMobileUtil();

  return (
    <div id="tenant" className="pb-20 pt-5 px-5 relative md:pt-30 md:px-35">
      <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
      <div className="*:text-white">
        <Title className="uppercase!" text="ХОТИТЕ СТАТЬ НАШИМ АРЕНДАТОРОМ?" />
        <Subtitle text="Будьте в курсе мировых премьер в нашем кинопрокате!"/>
      </div>
      <div className="mt-15 md:mt-10 md:max-w-4xl 3xl:max-w-5xl md:mx-auto">
        <form
          className="p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
          action="#"
        >
          <div className="md:grid md:grid-cols-2 md:gap-5">
            <div>
              <h3 className="uppercase font-bold mb-2 text-sm 3xl:text-xl">Ваш бизнес:</h3>
              <label className="flex flex-col mb-3" htmlFor="first-label">
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">
                  Торговый профиль
                </span>
                <select className="*:font-thin py-2 border-b 3xl:text-lg" id="first-label">
                  <option value="Магазин">Магазин</option>
                  <option value="Магазин">Акция</option>
                  <option value="Магазин">Продукты</option>
                  <option value="Магазин">Арендаторы</option>
                </select>
              </label>
              <label
                className="hidden flex-col mb-3 md:flex"
                htmlFor="second-label"
              >
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">
                  Желаемая площадь
                </span>
                <input
                  className="*:font-thin py-1 border-b"
                  type="text"
                  id="second-label"
                />
              </label>
              <label
                className="hidden flex-col mb-3 md:flex"
                htmlFor="third-label"
              >
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">
                  Название бренда/компании
                </span>
                <input
                  className="*:font-thin py-1 border-b"
                  type="text"
                  id="third-label"
                />
              </label>
            </div>
            <div className="md:block hidden">
              <h3 className="uppercase font-bold mb-2 text-sm 3xl:text-lg">
                Ваши контактные данные:
              </h3>
              <label className="flex flex-col mb-3" htmlFor="fourth-label">
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">
                  Имя контактного лица
                </span>
                <input
                  className="*:font-thin py-1 border-b"
                  type="text"
                  id="fourth-label"
                />
              </label>
              <label className="flex flex-col mb-3" htmlFor="fifth-label">
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">Почта</span>
                <input
                  className="*:font-thin py-1 border-b"
                  type="text"
                  id="fifth-label"
                />
              </label>
              <label className="flex flex-col mb-3" htmlFor="sixth-label">
                <span className="text-[#858585] font-bold text-sm 3xl:text-lg">Телефон</span>
                <input
                  className="*:font-thin py-1 border-b"
                  type="text"
                  id="sixth-label"
                  placeholder="+998 __ ___ __ __"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            {isMobile ? (
              <Link
                to="/tenant"
                className="bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold"
              >
                ОТПРАВИТЬ
              </Link>
            ) : (
              <Link
                to="/"
                className="bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold text-sm 3xl:text-xl"
              >
                ОТПРАВИТЬ
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="footer" className="py-10 px-5 bg-[#F2F2F2]">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">+998 94 440 44 40</span>
        <span className="text-2xl font-bold">familypark@gmail.com</span>
        <div className="mt-4 flex gap-3 items-center">
          <img src="/icons/clock.svg" alt="" />
          <span>Пн-Вс с 10:00 до 23:00 </span>
        </div>
      </div>
      <div className="mt-10 mb-7">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Социальные сети</h3>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/instagram.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Instagram</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/telegram.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Telegram</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/tiktok.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Tik Tok</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/facebook.svg"
                alt="instagram-icon"
                className="h-6 w-6"
              />
              <span>Facebook</span>
            </div>
            <div className="flex gap-3 items-center">
              <img
                src="/icons/youtube.svg"
                alt="instagram-icon"
                className="w-6"
              />
              <span>Youtube</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-lg">Правила</h3>
            <span>Правила посетителя</span>
            <span>Правила парковки</span>
            <span>Правила размещения рекламы</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src="/footerLogo.svg" alt="footer-logo" />
        <h3 className="mt-10 text-2xl text-center">
          Тематически-развлекательный центр в городе Самарканд
        </h3>
      </div>
    </footer>
  );
}

function FooterDesktop() {
  return (
    <footer
      id="footer"
      className="py-10 px-5 bg-[#F2F2F2] pt-40 h-screen items-start *:w-full"
    >
      <div className="grid grid-cols-4">
        <div className="flex flex-col items-center justify-center">
          <img src="/footerLogo.svg" alt="footer-logo" />
          <h3 className="mt-10 text-2xl text-center">
            Тематически-развлекательный центр в городе Самарканд
          </h3>
        </div>
        <div className="flex flex-col ml-5">
          <span className="text-2xl font-bold">+998 94 440 44 40</span>
          <span className="text-2xl font-bold">familypark@gmail.com</span>
          <div className="mt-4 flex gap-3 items-center">
            <img src="/icons/clock.svg" alt="" />
            <span>Пн-Вс с 10:00 до 23:00 </span>
          </div>
        </div>
        <div className="ml-20">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-lg">Социальные сети</h3>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/instagram.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Instagram</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/telegram.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Telegram</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/tiktok.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Tik Tok</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/facebook.svg"
                  alt="instagram-icon"
                  className="h-6 w-6"
                />
                <span>Facebook</span>
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src="/icons/youtube.svg"
                  alt="instagram-icon"
                  className="w-6"
                />
                <span>Youtube</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Правила</h3>
          <span>Правила посетителя</span>
          <span>Правила парковки</span>
          <span>Правила размещения рекламы</span>
        </div>
      </div>
      <img
        className="w-300 h-30 transform scale-150 block mt-40"
        src="/footerLogo.svg"
        alt=""
      />
    </footer>
  );
}

export default Home;