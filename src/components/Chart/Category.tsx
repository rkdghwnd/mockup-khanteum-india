import { ReactNode } from "react";
import { cn } from "../../utils/util";

type CategoryProps = {
  children: ReactNode;
  className?: string;
};

const Category = ({ children, className }: CategoryProps) => {
  return <div className={cn("w-[48%] bg-[#e7e7f2] relative font-semibold flex justify-between mt-2 p-2 rounded-lg", className)}>{children}</div>;
};

export default Category;
