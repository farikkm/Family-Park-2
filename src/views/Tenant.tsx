import Header from "@/components/Header";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useEffect } from "react";

const Tenant = () => {
  useEffect(() => {
    document.body.removeAttribute("style");
  }, []);
  return (
    <>
      <Header />
      <div id="tenant" className="pb-20 pt-30 px-5 relative">
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="*:text-white">
          <Title text="Хотите стать нашим арендатором?" className="md:max-w-[800px]" />
          <Subtitle text="Будьте в курсе мировых премьер в нашем кинопрокате!" />
        </div>
        <div className="mt-5 md:mt-0 flex justify-center">
          <form
            className="w-full max-w-[800px] p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
            action="#"
          >
            <div>
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
                <label className="flex flex-col mb-3" htmlFor="second-label">
                  <span className="text-[#858585] font-bold">
                    Желаемая площадь
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="second-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="third-label">
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
              <div>
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
              <div className="flex justify-center mt-10">
                <button className="bg-gradient-to-br from-[#fa557b] to-[#bb2649] py-4 px-20 rounded-4xl text-white font-bold">
                  ОТПРАВИТЬ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tenant;
