import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/views/Home";
import Catalog from "@/views/Catalog";
import Market from "@/views/Market";
import Events from "@/views/Events";
import Cinema from "@/views/Cinema";
import HR from "./views/HR";
import Tenant from "./views/Tenant";
import LostItem from "./views/LostItem";
import Map from "./views/Map";
import FAQ from "./views/FAQ";
import i18n from "./i18n";
import { useState } from "react";
import NotFound from "./views/NotFound";
import LanguageGuard from "./components/app/LanguageGuard";
import Wrapper from "./components/app/MainLayout";
import Search from "./views/Search";
import ComingSoon from "./views/ComingSoon";
import Rules from "./views/Rules";

function App() {
  const [langKey, setLangKey] = useState(i18n.language);
  let shortLng = i18n.language.split("-")[0];

  return (
    <BrowserRouter>
      <Wrapper onLangChange={langKey}>
        <Routes>
          {/* Редирект по умолчанию */}
          <Route path="/" element={<Navigate to={`/${shortLng}/`} replace />} />
          {/* Странциы с нужными языками */}
          <Route
            path="/:lng/"
            element={<LanguageGuard setLangKey={setLangKey} />}
          >
            <Route path="" element={<Home />} />
            <Route path={`search`} element={<Search />} />
            <Route path={`map`} element={<Map />} />
            <Route path={`catalog/:category`} element={<Catalog />} />
            <Route path={`market/:id`} element={<Market />} />
            <Route path={`events`} element={<Events />} />
            <Route path={`cinema`} element={<Cinema />} />
            <Route path={`hr`} element={<HR />} />
            <Route path={`tenant`} element={<Tenant />} />
            <Route path={`lost-item`} element={<LostItem />} />
            <Route path={`faq`} element={<FAQ />} />
            <Route path={`rule/:ruleName`} element={<Rules />} />
            <Route path={`coming_soon`} element={<ComingSoon />} />
          </Route>
          {/* Если неверный путь */}
          <Route path="/:lng/*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
