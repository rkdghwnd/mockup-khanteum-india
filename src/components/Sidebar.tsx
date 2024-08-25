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
  return (
    <div
      className={cn(
        "absolute overflow-y-auto right-0 top-[50px] z-20 w-4/5 max-w-[350px] sm:min-h-[calc(100vh-102px)] max-h-[calc(100vh-102px)] pt-5 px-2  shadow-2xl border border-white border-solid backdrop-blur-sm bg-[#F0F0F099] rounded-s-3xl transition duration-500 ease-in-out opacity-100",
        {
          ["translate-x-full opacity-0"]: !open,
        }
      )}
    >
      <div className="h-1/6 flex justify-center items-center flex-col mb-8">
        <Avatar size={"xl"} src="" className="" />
        <p className="text-sm">Hello.</p>
        <p className="text-sm">{"Guest"}!</p>
      </div>
      <SidebarMenuGroup />
      <div className="w-full flex justify-center mt-5">
        <Link to="login" className="block font-bold w-11/12">
          Login {">"}
        </Link>
      </div>
      <div className="mt-5 flex justify-center ">
        <div className="flex flex-col w-11/12 text-xs text-slate-600">
          <Link to="#none">Terms of Use for Khanteum Service</Link>
          <Link to="#none">Privacy Policy</Link>
          <Link to="#none">Operating Policy</Link>
          <Link to="#none">Paid Service Terms and Conditions</Link>
          <button onClick={setToggle} className="block w-full text-left">
            Business Information{" "}
            <span
              className={cn("inline-block duration-300 transform rotate-0", {
                ["rotate-180 "]: toggle,
              })}
            >
              ▼
            </span>
          </button>
          <div className={cn("mt-2 h-0 overflow-hidden text-[10px]  transition-all duration-500", { ["h-[200px]"]: toggle })}>
            <p>Khanaires Corporation</p>
            <p>Address: 203-2, 25, 25, Digital-ro 32ga-gil, Guro-gu, Seoul, Republic of Korea</p>
            <p>CEO: Youngkyun Kim</p>
            <p>Business license number: 252-87-01071</p>
            <p>Mail-order Business: 제2022-서울구로-1015호</p>
            <p>Telephone: 070-4120-3619 (Available hours: 10:00~13:00, 14:00~18:00)</p>
            <p>Email: contact@khanaires.com</p>
            <p>Ⓒ 2022 Khanaires Corporation ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
