import Header from "@/components/Header";

const Map = () => {
  return (
    <>
      <Header />
      <div className="mt-25">
        <iframe
          style={{ background: "none", border: "none", width: "100%" }}
          height={700}
          src="/libs/map/index_1.html"
        ></iframe>
      </div>
    </>
  );
};

export default Map;
