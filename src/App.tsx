import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
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
import { getCurrentLng } from "./utils/language";
import { useEffect, useState } from "react";

const supportedLanguages = ["ru", "en", "uz"];

function LanguageGuard() {
  const { lng } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!supportedLanguages.includes(lng || "")) {
      navigate(
        `/${getCurrentLng}${location.pathname.replace(/^\/[^/]+/, "")}`,
        { replace: true }
      );
    }
  }, [lng, navigate]);

  useEffect(() => {
    const onLanguageChange = (newLng: string) => {
      if (supportedLanguages.includes(newLng) && newLng !== lng) {
        const newPath = `/${newLng}${location.pathname.replace(
          /^\/[^/]+/,
          ""
        )}`;
        navigate(newPath, { replace: true });
      }
    };

    i18n.on("languageChanged", onLanguageChange);
    return () => {
      i18n.off("languageChanged", onLanguageChange);
    };
  }, [lng, navigate]);

  return <Outlet />;
}

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

function App() {
  const [langKey, setLangKey] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLangKey(lng); // Меняем ключ → принудительный ререндер всех компонентов
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper" key={langKey}>
        <Routes>
          {/* Редирект по умолчанию */}
          <Route
            path="/"
            element={<Navigate to={`/${i18n.language}/`} replace />}
          />
          {/* Странциы с нужными языками */}
          <Route path="/:lng/*" element={<LanguageGuard />}>
            <Route path="" element={<Home />} />
            <Route path={`map`} element={<Map />} />
            <Route path={`catalog`} element={<Catalog />} />
            <Route path={`market`} element={<Market />} />
            <Route path={`events`} element={<Events />} />
            <Route path={`cinema`} element={<Cinema />} />
            <Route path={`hr`} element={<HR />} />
            <Route path={`tenant`} element={<Tenant />} />
            <Route path={`lost-item`} element={<LostItem />} />
            <Route path={`faq`} element={<FAQ />} />
          </Route>
          {/* Если неверный путь */}
          {/* <Route path="/:lng/*" element={<NotFound />} />  */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
