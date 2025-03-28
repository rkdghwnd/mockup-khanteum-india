import { useEffect, useState } from "react";
import HamburgerBtn from "./HamburgerBtn";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // 메뉴 클릭으로 url이 이동하면 사이드바 닫기 useEffect
  useEffect(() => {
    setSidebarToggle(false);
  }, [pathname]);
  return (
    <header className="fixed  top-0 left-1/2 -translate-x-1/2 z-20 w-full bg-white max-w-[768px] h-[50px] flex items-center justify-center  ">
      <div className="w-[204px] h-[34px] ">
        {/* <img src="/slotMachine.gif"/> */}
        <div className="w-full h-full bg-gradient-to-r from-blue-50 to-white rounded-lg flex items-center justify-center overflow-hidden shadow-md border border-gray-200">
          <div className="text-[#00d4c8] font-bold text-xl md:text-2xl font-sans tracking-wide transition-all duration-300 hover:text-[#245aab] flex items-center">
            <span className="animate-pulse">000000000000</span>
          </div>
        </div>
      </div>
      <HamburgerBtn
        className="absolute top-1/2 right-[15px] -translate-y-1/2"
        toggle={setSidebarToggle}
        openState={sidebarToggle}
      />
      <Sidebar open={sidebarToggle} />
    </header>
  );
};

export default Header;
