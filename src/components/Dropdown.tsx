import { MouseEvent, useReducer, useState } from "react";
import { cn } from "../utils/util";

type DropdownProps = {
  className?: string;
  selectList: string[];
  onChange: (id: string, list: string) => void;
  id: string;
  defaultValue?: string;
};

const Dropdown = ({ id, className, selectList, onChange, defaultValue }: DropdownProps) => {
  const [toggle, setToggle] = useReducer((prev) => !prev, false);
  const [value, setValue] = useState(defaultValue ?? selectList[0]);

  const changeHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.dataset["id"]) {
      onChange(id, e.currentTarget.dataset["id"]);
      setValue(e.currentTarget.dataset["id"]);
    }
  };

  return (
    <button
      onClick={setToggle}
      className={cn("relative min-w-[95px] h-[25px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.18)] text-center rounded cursor-pointer", className)}
    >
      <div className="w-full h-full text-xs pt-[1.5px] flex justify-center items-center">
        <span className="w-3/4 text-center truncate p-2">{value}</span>
        <span className="w-1/4 pr-2">▼</span>
      </div>
      {toggle && (
        <div className="absolute top-full text-xs w-full bg-white  shadow-[0px_2px_6px_rgba(0,0,0,0.18)]  ">
          <ul>
            {selectList.map((list) => (
              <li key={list} onClick={changeHandler} data-id={list} className="hover:bg-[#b7b7b7] text-[#464646] truncate py-2 px-1">
                {list}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export default Dropdown;
