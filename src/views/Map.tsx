import StaticHeaderBlack from "@/components/header/StaticHeaderBlack";
import isMobileUtil from "@/utils/isMobile";

const Map = () => {
  const isMobile = isMobileUtil();

  return (
    <>
      <StaticHeaderBlack />
      {!isMobile ? (
        <div className="mt-25">
          <iframe
            style={{ background: "none", border: "none", width: "100%" }}
            height={700}
            src="/libs/map/index_1.html"
          ></iframe>
        </div>
      ): (
        <div className="w-full px-4 h-screen flex justify-center items-center">
          <h3 className="text-2xl text-center font-bold text-red-500 p-4 bg-blue-100 rounded-3xl">Карта не доступна на мобильных устройствах</h3>
        </div>
      )}
    </>
  );
};

export default Map;
