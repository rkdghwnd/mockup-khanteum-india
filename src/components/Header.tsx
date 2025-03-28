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
      <div className="w-[275px] h-[38px] ">
        <div className="w-full h-full relative">
          <div
            className="w-full h-full rounded-lg relative overflow-hidden"
            style={{
              background: "black",
              boxShadow:
                "0 0 10px rgba(255, 105, 180, 0.7), 0 0 20px rgba(255, 105, 180, 0.5)",
              border: "3px solid transparent",
              backgroundImage:
                "linear-gradient(black, black), linear-gradient(to right, #ff69b4, #ff1493)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
          >
            {/* 핑크색 LED 조명 효과 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-0 w-full flex justify-between px-[2px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: "#ff1493",
                      boxShadow: "0 0 3px #ff1493, 0 0 5px #ff1493",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-[2px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: "#ff1493",
                      boxShadow: "0 0 3px #ff1493, 0 0 5px #ff1493",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* P 마크 */}
            <div
              className="absolute top-1/2 left-1 transform -translate-y-1/2 h-[28px] w-[16px] flex items-center justify-center rounded-sm"
              style={{
                background: "linear-gradient(145deg, #ff1493, #ff69b4)",
                boxShadow: "0 0 5px #ff1493",
              }}
            >
              <span className="text-white font-bold text-sm">P</span>
            </div>

            {/* 숫자 디스플레이 영역 */}
            <div className="absolute top-1/2 left-[20px] transform -translate-y-1/2 h-[28px] right-1 bg-black rounded-sm flex items-center">
              <div className="w-full text-center flex items-center justify-between px-2">
                {[
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                  "0",
                ].map((num, index) => (
                  <span
                    key={index}
                    className="text-black bg-white w-[20px] h-[24px] flex items-center justify-center rounded-sm font-mono font-bold text-lg mx-[1px]"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
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
