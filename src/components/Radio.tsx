import { InputHTMLAttributes } from "react";
import { cn } from "../utils/util";
type RadioProps = {
  className?: string;
  dataId?: number;
  changeFn: (label: string) => void;
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ className, name, changeFn, label, dataId, ...args }: RadioProps) => {
  const changeHandler = () => {
    changeFn(label);
  };
  return (
    <label data-id={dataId} onClick={changeHandler} className={cn(" flex items-center cursor-pointer", className)}>
      <input type="radio" className="accent-[#d04bff]" {...args} name={name} />
      <span className="ml-2 text-xs truncate">{label}</span>
    </label>
  );
};

export default Radio;
