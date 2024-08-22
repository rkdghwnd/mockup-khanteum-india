import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { cn } from "../utils/util";

type HamburgerBtnProps = { className?: string; toggle: Dispatch<SetStateAction<boolean>>; openState: boolean };

const HamburgerBtn = ({ className, toggle, openState }: HamburgerBtnProps) => {
  const spanStyle = "absolute w-full h-[2px] bg-slate-400 transition-[0.3s] transform";

  const openTarget = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    toggle(checked);
  };
  return (
    <div className={cn("w-[17px] h-[12px] relative", className)}>
      <label htmlFor="hamburger-trigger" className="absolute block  w-full h-full cursor-pointer">
        <input id="hamburger-trigger" type="checkbox" className="hidden peer" onChange={openTarget} checked={openState} />
        <span className={cn(spanStyle, "top-0 peer-checked:top-1/2 peer-checked:rotate-45")}></span>
        <span className={cn(spanStyle, "top-1/2 peer-checked:opacity-0")}></span>
        <span className={cn(spanStyle, "top-full peer-checked:top-1/2 peer-checked:-rotate-45")}></span>
      </label>
      <div className=""></div>
    </div>
  );
};

export default HamburgerBtn;
