import Header from "@/components/Header";
import Accordion from "@/components/ui/Accordion";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useEffect } from "react";

const CinemaHallSession = () => {
  return (
    <div className="flex justify-between items-center border-b border-b-[#888888] pb-2">
      <div className="flex items-center gap-3">
        <span className="font-black">10:20</span>
        <span>Аватар: Путь воды</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-black">32 000</span>
        <span>12+</span>
      </div>
    </div>
  );
};

const Cinema = () => {
  useEffect(() => {
    document.body.removeAttribute("style");
  }, []);
  return (
    <>
      <Header icons="white" />

      <div id="cinema" className="relative pt-30 px-5 md:px-30 mb-10">
        <div className="blue-gradient absolute left-0 top-0 w-full h-105 -z-1" />

        <Title text="Расписание кино" className="" />
        <Subtitle text="Будьте в курсе мировых премьер в нашем кинопрокате!" />

        <p className="text-white text-3xl md:text-4xl text-center mt-8 font-black mb-1">
          c 5 по 12 января
        </p>

        {/* ========================================== Сеансы ========================================== */}
        <div className="w-full flex justify-center">
          <div className="max-w-[800px] w-full">
            <Accordion title="Зал 1" className="mt-8!" initialState="open">
              <div className="mt-5 flex flex-col gap-5 px-3">
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
              </div>
            </Accordion>

            <Accordion title="Зал 2" className="mt-8!">
              <div className="mt-5 flex flex-col gap-5 px-3">
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
              </div>
            </Accordion>

            <Accordion title="Зал 3" className="mt-8!">
              <div className="mt-5 flex flex-col gap-5 px-3">
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
                <CinemaHallSession />
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cinema;
