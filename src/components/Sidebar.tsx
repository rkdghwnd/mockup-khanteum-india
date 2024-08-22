import { Link } from "react-router-dom";
import { cn } from "../utils/util";
import Avatar from "./Abatar";
import SidebarMenuGroup from "./SidebarMenuGroup";
import { useReducer } from "react";

type SidebarProps = {
  open: boolean;
};

const Sidebar = ({ open }: SidebarProps) => {
  const [toggle, setToggle] = useReducer((prev) => !prev, false);
  console.log(toggle);
  return (
    <div
      className={cn(
        "absolute right-0 top-[50px] w-4/5 max-w-[350px] h-[calc(100vh-102px)] pt-5 px-2 overflow-y-scroll shadow-2xl border border-white border-solid backdrop-blur-sm bg-[#F0F0F099] rounded-s-3xl transition duration-500 ease-in-out opacity-100",
        {
          ["translate-x-full opacity-0"]: !open,
        }
      )}
    >
      <div className="h-1/6 flex justify-center items-center flex-col mb-8">
        <Avatar size={"xl"} src="" className="" />
        <p className="text-sm">안녕하세요!</p>
        <p className="text-sm">{"guest"}님!</p>
      </div>
      <SidebarMenuGroup />
      <div className="w-full flex justify-center mt-5">
        <Link to="login" className="block font-bold w-11/12">
          로그인 {">"}
        </Link>
      </div>
      <div className="mt-5 flex justify-center ">
        <div className="flex flex-col w-11/12 text-xs text-slate-600">
          <Link to="#none">칸태움 서비스 이용약관</Link>
          <Link to="#none"> 개인정보 처리방침</Link>
          <Link to="#none">운영정책</Link>
          <Link to="#none">유료서비스 약관</Link>
          <button onClick={setToggle} className="block w-full text-left">
            사업자 정보 <span className={cn("inline-block duration-300 transform rotate-0", { ["rotate-180 "]: toggle })}>▼</span>
          </button>
          <div className={cn("mt-2 h-0 overflow-hidden text-[10px]  transition-all duration-500", { ["h-[200px]"]: toggle })}>
            <p>주식회사 카네어스</p>
            <p>주소: 서울특별시 구로구 디지털로32가길 25, 203-2호(구로동, 티타운빌딩)</p>
            <p>대표자명: 김영균</p>
            <p>사업자번호: 252-87-01071</p>
            <p>통신판매업: 제2022-서울구로-1015호</p>
            <p>연락처: 070-4120-3619 (문의 가능 시간: 10:00~13:00, 14:00~18:00)</p>
            <p>이메일: contact@khanaires.com</p>
            <p>Ⓒ 2022 주식회사 카네어스 ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
