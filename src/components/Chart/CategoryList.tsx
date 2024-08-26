import CirclePlusIcon from "../../icons/CirclePlusIcon";
import CrownIcon from "../../icons/CrownIcon";
import { cn, randomCount } from "../../utils/util";
import Category from "./Category";

const CategoryList = ({ category }: { category: string[] }) => {
  return (
    <div className="mt-3 text-center">
      <h2 className="text-xl font-bold">Push by category</h2>
      <div className="flex flex-wrap justify-between px-2 ">
        {category.map((category, idx) => (
          <Category key={category + idx}>
            {idx === 0 && <CrownIcon className="absolute left-2 bottom-[100%]" />}
            <p>{category}</p>
            <p className={cn({ ["text-[#5e34d9]"]: idx === 0 })}>{randomCount(100000).toLocaleString()}</p>
          </Category>
        ))}
        <Category className="cursor-pointer">
          <CirclePlusIcon className="inline-block mx-auto" />
        </Category>
      </div>
    </div>
  );
};

export default CategoryList;
