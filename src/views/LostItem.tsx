import Header from "@/components/Header";
import { useEffect } from "react";
import Title from "@/components/ui/Title";

const LostItem = () => {
  useEffect(() => {
    document.body.removeAttribute("style");
  }, []);

  return (
    <>
      <Header icons="white" />
      <div id="lost-item" className="pb-20 px-5 relative pt-30 md:px-35">
        <div className="red-gradient absolute left-0 top-0 w-full h-120 -z-1" />
        <div className="*:text-white">
          <Title className="max-w-[800px]" text="ПОТЕРЯЛИ ЧТО-ТО ВАЖНОЕ" />
          <p className="text-2xl mt-3 font-light md:text-3xl md:mt-5">
            Заполните небольшую форму и мы свяжемся с вами
          </p>
        </div>
        <div className="mt-5 md:mt-0 flex justify-center">
          <form
            className="w-full max-w-[800px] p-10 mt-5 bg-gradient-to-br from-[#F1F1F1] to=[#FFF] backdrop-blur-xl light-shadow rounded-4xl"
            action="#"
          >
            <div>
              <div>
                <h3 className="uppercase font-bold mb-2">
                  Ваши контактные данные:
                </h3>
                <label className="flex flex-col mb-3" htmlFor="second-label">
                  <span className="text-[#858585] font-bold">
                    Имя контактного лица
                  </span>
                  <input
                    placeholder="Цыркач Виталий Владиленович"
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="second-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="second-label">
                  <span className="text-[#858585] font-bold">
                    Телефон
                  </span>
                  <input
                    placeholder="+998 -- --- -- -- "
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="second-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="third-label">
                  <span className="text-[#858585] font-bold">
                    Что потеряли:
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
                  Дополнительная информация:
                </h3>
                <label className="flex flex-col mb-3" htmlFor="fourth-label">
                  <span className="text-[#858585] font-bold">
                    Где вы находились?
                  </span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="fourth-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="fifth-label">
                  <span className="text-[#858585] font-bold">Время потери</span>
                  <input
                    className="*:font-thin py-1 border-b"
                    type="text"
                    id="fifth-label"
                  />
                </label>
                <label className="flex flex-col mb-3" htmlFor="sixth-label">
                  <span className="text-[#858585] font-bold">Комментарий:</span>
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

export default LostItem;
