
import Title from "@/components/ui/Title";

const Events = () => {
  return (
    <>
      <Header />
      <div id="events" className="pt-30 px-5 md:px-30">
        <Title className="blue-gradient bg-clip-text text-transparent!" text="КОНЦЕРТЫ И СОБЫТИЯ"/>
        <div className="mt-5 max-w-full h-[218px] md:h-[700px] shadow-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/P1uAB_IQr98?si=Pzn4YDfStbO4eZKC"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          ></iframe>
        </div>
        <h3 className="red-gradient mt-3 text-2xl md:text-4xl font-bold uppercase drop-shadow-2xl bg-clip-text text-transparent">
          24 февраля 2023
        </h3>
        <h2 className="blue-gradient mt-5 text-3xl md:text-5xl font-black uppercase drop-shadow-2xl text-transparent bg-clip-text">
          Грандиозное событие
        </h2>
        <p className="mt-2 uppercase text-xl md:text-3xl md:mt-3">
          Family ice arena, 1 этаж
        </p>
        <p className="mt-5 font-bold text-2xl md:text-4xl text-[#343464] uppercase">
          ПРОЖИВИ ЭТО С НАМИ!
        </p>
        <p className="mb-5 md:text-lg">
          Грандиозный концерт знаменитых артистов в нашем замечательном ТРЦ
          Family Park. Испытай кучу незабываемых эмоций! 24 Февраля придут гости
          из популярных стран. Чтобы исполнить свой очередной хит. Успей купить
          билеты прямо сейчас!
        </p>
      </div>
    </>
  );
};

export default Events;
