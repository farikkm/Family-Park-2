import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import isMobileUtil from "@/utils/isMobile";
import Modal from "./components/Modal";
import StaticHeader from "./StaticHeader";
import StaticHeaderBlack from "./StaticHeaderBlack";

const ResponsiveHeader = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [iconState, setIconState] = useState(false);
  const location = useLocation();
  const isMobile = isMobileUtil();

  // ===== Белые иконки при переходе к определенный страницам ===== //
  if (!isMobile) {
    useEffect(() => {
      const handleStorageChange = () => {
        const swiperIndex = Number(localStorage.getItem("swiperIndex")) || 0;
        setIconState([1, 2, 3, 4, 5, 6].includes(swiperIndex));
      };

      handleStorageChange();

      const interval = setInterval(handleStorageChange, 500);
      return () => clearInterval(interval);
    }, [location.pathname]);
  }

  return (
    <>
      {/* //! ======================================================= HEADER =======================================================*/}

      {iconState ? <StaticHeader /> : <StaticHeaderBlack />}

      {/* ======================================================= MODAL =======================================================*/}
      {isShowModal && (
        <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      )}
    </>
  );
};

export default ResponsiveHeader;
