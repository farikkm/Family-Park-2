import i18n from "./i18n";
import NotFound from "./views/NotFound";
import { Suspense, lazy, useState } from "react";
import Wrapper from "./components/app/MainLayout";
import LanguageGuard from "./components/app/LanguageGuard";
import LoadingScreen from "./components/app/LoadingScreen";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RulesProvider } from "./context/RulesProvider";

const Home = lazy(() => import("@/views/Home"));
const Map = lazy(() => import("@/views/Map"));
const Events = lazy(() => import("@/views/Events"));
const Catalog = lazy(() => import("@/views/Catalog"));
const Market = lazy(() => import("@/views/Market"));
const Tenant = lazy(() => import("@/views/Tenant"));
const LostItem = lazy(() => import("@/views/LostItem"));
const HR = lazy(() => import("@/views/HR"));
const FAQ = lazy(() => import("@/views/FAQ"));
const Search = lazy(() => import("@/views/Search"));
const ComingSoon = lazy(() => import("@/views/ComingSoon"));
const Rules = lazy(() => import("@/views/Rules"));
const Event = lazy(() => import("@/views/Event"));

function App() {
  const [langKey, setLangKey] = useState(i18n.language);
  let shortLng = i18n.language.split("-")[0];

  return (
    <BrowserRouter>
      <Wrapper onLangChange={langKey}>
        <RulesProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Редирект по умолчанию */}
              <Route
                path="/"
                element={<Navigate to={`/${shortLng}/`} replace />}
              />
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
                <Route path={`event/:id`} element={<Event />} />
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
          </Suspense>
        </RulesProvider>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
