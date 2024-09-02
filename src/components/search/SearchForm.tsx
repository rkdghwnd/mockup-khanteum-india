import { FormEvent, useRef } from "react";
import CancelIcon from "../../icons/CancelIcon";
import SearchIcon from "../../icons/SearchIcon";

const SearchForm = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  //검색시 실행될 함수
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  // input초기화
  const initialInput = () => (searchRef.current ? (searchRef.current.value = "") : undefined);

  return (
    <form className="w-full  flex items-center " onSubmit={submitHandler}>
      <div className="relative w-full p-1 px-3 mr-2 bg-white border-[1.5px] border-solid border-[#b7b7b7] rounded-2xl overflow-hidden">
        <input type="text" ref={searchRef} className="w-full pr-6 text-sm text-[#464646] outline-none" />
        <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={initialInput}>
          <CancelIcon />
        </button>
      </div>
      <button className=" flex items-center justify-center w-[31px] h-[31px] border border-solid border-[#b7b7b7] rounded-full pb-[1px]">
        <SearchIcon strokeColor="#000" className="w-[15px] h-[15px]" />
      </button>
    </form>
  );
};

export default SearchForm;
