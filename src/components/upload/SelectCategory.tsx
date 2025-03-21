import { useState } from "react";

type SelectCategoryProps = {
  selectList: string[];
  onSelect: (category: string) => void;
};

const SelectCategory = ({ selectList, onSelect }: SelectCategoryProps) => {
  const [current, setCurrent] = useState(selectList[0]);

  const handleCategoryChange = (category: string) => {
    setCurrent(category);
    onSelect(category);
  };

  return (
    <div className="w-full bg-white mt-4 px-3 py-2 rounded-xl shadow-[0px_2px_6px_rgba(0,0,0,0.18)]">
      <div className="flex flex-wrap gap-2 mt-1">
        {selectList.map((item, index) => (
          <button
            key={index}
            className={`px-3 border-[1px] rounded-xl text-sm ${
              current === item
                ? "text-white bg-[#464646] border-[#464646]"
                : "text-[#464646] border-[#464646]"
            }`}
            onClick={() => handleCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
