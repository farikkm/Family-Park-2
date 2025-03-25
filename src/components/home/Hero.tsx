import { useTranslation } from "react-i18next";
import Background from "../ui/Background";

function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <Background />
      <section
        id="hero"
        className="block md:flex md:gap-30 flex-row-reverse justify-between items-center md:px-20 md:pt-10"
      >
        <div className="hero-img min-w-[100px] w-full h-65 md:h-130 3xl:h-190 overflow-hidden">
          <img
            className="block md:hidden w-full h-full object-cover"
            src="/icons/hero/img_mobile.png"
            alt="hero-img"
          />
          <img
            className="md:block max-w-full hidden h-full w-full object-cover rounded-4xl"
            src="/icons/hero/img.png"
            alt="hero-img"
          />
        </div>
        <div className="hero-content md:max-w-[700px] 3xl:max-w-[900px] w-full py-5 px-5 md:pr-6 md:pl-20">
          <h2 className="font-black *:uppercase">
            <img
              src="/icons/hero/logo.png"
              alt="hero-logo"
              className="hidden md:inline-block mb-7 pointer-events-none"
            />
            <span className="block text-4xl xs:text-5xl md:text-6xl 3xl:text-8xl 2xl:text-7xl  drop-shadow-2xl bg-gradient-to-br from-[#6A6DBD] to-[#25254C] text-transparent bg-clip-text">
              {t("home.hero.title1")}
            </span>
            <span className="bg-gradient-to-b text-4xl xs:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl  drop-shadow-2xl from-[#fa557b] to-[#bb2649] bg-clip-text text-transparent md:ml-[60px]">
              {t("home.hero.title2")}
            </span>
          </h2>
          <p className="mt-5 md:mt-10 mb-8 text-sm md:text-xl 3xl:text-2xl md:max-w-[460px] 3xl:max-w-[600px] ">
            {t("home.hero.subtitle")}
          </p>
        </div>
      </section>
    </>
  );
}

export default Hero;