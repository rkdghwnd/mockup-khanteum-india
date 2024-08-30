import { useEffect, useState } from "react";
import HamburgerBtn from "./HamburgerBtn";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {
    setSidebarToggle(false);
  }, [pathname]);
  return (
    <header className="fixed  top-0 left-1/2 -translate-x-1/2 z-20 w-full bg-white max-w-[768px] h-[50px] flex items-center justify-center  ">
      <div className="w-[204px] h-[34px] ">
        <video autoPlay muted>
          <source src="slotMachine.mp4" type="video/mp4"></source>
        </video>
      </div>
      <HamburgerBtn className="absolute top-1/2 right-[15px] -translate-y-1/2" toggle={setSidebarToggle} openState={sidebarToggle} />
      <Sidebar open={sidebarToggle} />
    </header>
  );
};

export default Header;
