import { Link, useLocation, useSearchParams } from "react-router-dom";
import ChartIcon from "../icons/ChartIcon";
import CirclePlusIcon from "../icons/CirclePlusIcon";
import ProfileIcon from "../icons/ProfileIcon";
import SearchIcon from "../icons/SearchIcon";

const BottomTab = () => {
  const [params] = useSearchParams();
  const chart = params.get("chart") === "true" ? true : false;

  const { pathname } = useLocation();
  return (
    <aside className="fixed right-0 bottom-0 left-0 z-50 h-[52px] bg-white flex justify-evenly items-center border-t-[1px] border-solid border-slate-200">
      <Link to={chart ? `${pathname}?chart=false` : `${pathname}?chart=true`}>
        <ChartIcon fill={chart} />
      </Link>
      <Link to="/upload">
        <CirclePlusIcon fill={pathname === "/upload"} />
      </Link>
      <Link to="/" className="w-[22px] h-[22px]">
        <img src="logo.png" />
      </Link>
      <Link to="/search">
        <SearchIcon fill={pathname === "/search"} />
      </Link>
      <Link to="/profile">
        <ProfileIcon fill={pathname === "/profile"} />
      </Link>
    </aside>
  );
};
//bg-[#ffffffe6]
export default BottomTab;
