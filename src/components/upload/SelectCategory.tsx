import { ChangeEvent, InputHTMLAttributes, MouseEvent, useReducer, useRef, useState } from "react";
import { cn } from "../../utils/util";
import SearchIcon from "../../icons/SearchIcon";

type SelectCategoryProps = {
  className?: string;
  selectList: string[];
} & InputHTMLAttributes<HTMLInputElement>;

const SelectCategory = ({ className, selectList, ...args }: SelectCategoryProps) => {
  const [toggle, setToggle] = useReducer((prev) => !prev, false);
  const [search, setSearch] = useState("");
  const selectRef = useRef<HTMLInputElement>(null);

  //select선택시 input에 value로 들어갈 함수
  const selectHandler = (e: MouseEvent<HTMLLIElement>) => {
    const select = selectRef.current;
    const target = e.currentTarget;
    if (select && target.dataset["id"]) select.value = target.dataset["id"];
  };

  //onchange 함수
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value);

  //list 필터링 하는 코드
  let filterList: string[] = [];
  if (search !== "" && selectList) {
    filterList = selectList.filter((list) => list.toLowerCase().includes(search.toLowerCase()));
  } else filterList = selectList;

  return (
    <div
      className={cn(
        "relative w-full shadow-[0px_2px_6px_rgba(0,0,0,0.18)] cursor-pointer rounded-md text-[#626262] py-1 pl-2 pr-6 md:p-3 bg-white",
        className
      )}
    >
      <div onClick={setToggle}>
        <input
          type="text"
          ref={selectRef}
          className="w-full h-full cursor-pointer text-sm outline-none"
          placeholder="Select Category"
          readOnly
          {...args}
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 cursor-pointer">| ▼</span>
      </div>
      {toggle && (
        <div className="absolute top-full left-0 w-full h-[110px] overflow-hidden bg-[#46464666] backdrop-blur-sm rounded-[10px] shadow-2xl mt-1 px-6 animate-opacityOn Z-[1]">
          <div className="relative w-full  mt-2 ">
            <input
              type="text"
              onChange={searchHandler}
              className="w-full h-full rounded-md shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] font-semibold text-[#494949] text-sm p-[2px] px-1"
            />
            <span className="absolute top-1/2 -translate-y-1/2 right-10 ">
              <SearchIcon strokeColor="#000" className="w-[13px] h-[13px]" />
            </span>
          </div>
          <ul className="overflow-y-scroll h-full">
            {filterList.map((val) => (
              <li
                key={val}
                data-id={val}
                onClick={selectHandler}
                className="w-full p-2 cursor-pointer text-sm text-white font-semibold border-b-2 border-solid border-white"
              >
                {val}
              </li>
            ))}
            <li></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
