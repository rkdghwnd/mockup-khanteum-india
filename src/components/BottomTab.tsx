import { useEffect } from "react";
import ChartIcon from "../icons/ChartIcon";
import NftIcon from "../icons/NftIcon";

const BottomTab = () => {
  const pathName = window.location;

  return (
    <aside className="fixed right-0 bottom-0 left-0 z-10 h-[52px] bg-[#ffffffe6] flex justify-evenly items-center">
      <ChartIcon />
      <NftIcon />
      <ChartIcon />
      <ChartIcon />
      <ChartIcon />
    </aside>
  );
};
//bg-[#ffffffe6]
export default BottomTab;
