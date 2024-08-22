import { ReactNode } from "react";
import { Link } from "react-router-dom";

type SidebarMenuProps = {
  link: string;
  title: string;
  emoji: ReactNode;
};

const SidebarMenu = ({ link, title, emoji }: SidebarMenuProps) => {
  return (
    <div className="w-11/12 h-[40px] shadow-lg rounded bg-[#c7c7c731] ">
      <Link to={link} className=" flex space-x-3 w-full h-full items-center ml-2 ">
        <span className="w-[40px] h-[40px] flex items-center justify-center">{emoji}</span>
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default SidebarMenu;
