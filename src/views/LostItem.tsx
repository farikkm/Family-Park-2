import Header from "@/components/Header";
import isMobileUtil from "@/utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LostItem = () => {
  let isMobile = isMobileUtil();
  useEffect(() => {
    document.body.removeAttribute("style");
  }, []);

  return (
    <>
      <Header icons="white" />
      <div
        id="lost-item"
        className="pb-20 pt-5 px-5 relative md:pt-30 md:px-35"
      >
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="*:text-white">
          <h2 className="text-4xl font-black md:text-6xl md:max-w-4xl">
            ПОТЕРЯЛИ ЧТО-ТО ВАЖНОЕ
          </h2>
          <p className="text-2xl mt-3 font-light md:text-3xl md:mt-5">
            Заполните небольшую форму и мы свяжемся с вами
          </p>
        </div>
        <div className="mt-15 md:mt-10 md:max-w-5xl md:mx-auto">
          <form
            className="p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl shadow-md shadow-black rounded-4xl"
            action="#"
          >
            <div className="md:grid md:grid-cols-2 md:gap-5">
              <div>
                <h3 className="uppercase font-bold mb-2">Ваш бизнес:</h3>
                <label className="flex flex-col mb-3" htmlFor="first-label">
                  <span className="text-[#858585] font-bold">
                    Торговый профиль
                  </span>
                  <select
                    className="*:font-thin py-2 border-b"
                    id="first-label"
                  >
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
                  <span className="text-[#858585] font-bold">
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
                  <span className="text-[#858585] font-bold">
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
                <h3 className="uppercase font-bold mb-2">
                  Ваши контактные данные:
                </h3>
                <label className="flex flex-col mb-3" htmlFor="fourth-label">
                  <span className="text-[#858585] font-bold">
                    Имя контактного лица
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="fourth-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="fifth-label">
                  <span className="text-[#858585] font-bold">Почта</span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="fifth-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="sixth-label">
                  <span className="text-[#858585] font-bold">Телефон</span>
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
                  to="/lost-item"
                  className="bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold"
                >
                  ОТПРАВИТЬ
                </Link>
              ) : (
                <Link
                  to="/"
                  className="bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold"
                >
                  ОТПРАВИТЬ
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LostItem;
