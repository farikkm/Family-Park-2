import { SliderDesktop } from "@/components/Slider";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import getHref from "@/utils/getHref";
import Footer from "@/components/footer/Footer";

// Swiper
import ResponsiveHeader from "@/components/header/ResponsiveHeader";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import SectionWithCatalogItems from "@/components/home/SectionWithCatalogItems";
import Events from "@/components/home/Events";
import Tenant from "@/components/home/Tenant";

const HOME_PAGE_CATEGORIES = {
  SHOP: "shop",
  FOOD: "food",
  ENTERTAINMENT: "entertainment",
};

// =================================== HOME PAGE =================================== //

const Home = () => {
  const { t } = useTranslation();

  let sections = [
    Hero,
    Statistics,
    Shops,
    Foods,
    Entartainments,
    Events,
    Tenant,
    Footer,
  ];

  return (
    <>
      <ResponsiveHeader />
      <main id="home" className="home mt-20 md:mt-0">
        <SliderDesktop sections={sections} />
      </main>
      <div className="buttons hidden md:flex fixed bottom-7 right-27 z-6 gap-3">
        <Button path={getHref("lost-item")}>{t("home.button1")}</Button>
        <Button path={getHref("/hr")} bg="blue">
          {t("home.button2")}
        </Button>
      </div>
    </>
  );
};

// =================================== SECTIONS =================================== //

function Shops() {
  return (
    <SectionWithCatalogItems
      background="blue"
      category_type={HOME_PAGE_CATEGORIES.SHOP}
      section_id="shops"
    />
  );
}

function Foods() {
  return (
    <SectionWithCatalogItems
      background="red"
      category_type={HOME_PAGE_CATEGORIES.FOOD}
      section_id="food"
    />
  );
}

function Entartainments() {
  return (
    <SectionWithCatalogItems
      background="blue"
      category_type={HOME_PAGE_CATEGORIES.ENTERTAINMENT}
      section_id="entertainment"
    />
  );
}

export default Home;
