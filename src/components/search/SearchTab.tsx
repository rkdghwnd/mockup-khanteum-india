import { Dispatch, SetStateAction } from "react";
import { cn } from "../../utils/util";

type SearchTabProps = { currentTab: number; setTab: Dispatch<SetStateAction<number>>; className?: string };

const SearchTab = ({ currentTab, setTab, className }: SearchTabProps) => {
  const tabChange = (idx: number) => {
    if (currentTab === idx) return;
    setTab(idx);
  };

  return (
    <div className={cn("h-[50px] border-b-2 border-solid border-[#e2e2e2] flex  ", className)}>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 0 })}
      >
        <button onClick={() => tabChange(0)}>{`Dreamer(${0})`}</button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 1 })}
      >
        <button onClick={() => tabChange(1)}>{`Video(${0})`}</button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 2 })}
      >
        <button onClick={() => tabChange(2)}>{`Picture(${0})`}</button>
      </div>
      <div
        className={cn("w-1/4  h-[50px] flex items-center justify-center ", { ["border-b-[2px] border-slate-800 border-solid"]: currentTab === 3 })}
      >
        <button onClick={() => tabChange(3)}>{`Vote(${0})`}</button>
      </div>
    </div>
  );
};

export default SearchTab;
