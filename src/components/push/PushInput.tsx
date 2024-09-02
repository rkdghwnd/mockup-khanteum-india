import { HTMLInputTypeAttribute, InputHTMLAttributes, useRef } from "react";
import { cn } from "../../utils/util";

type PushInputProps = {
  label: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

const PushInput = ({ className, label, type = "text", ...args }: PushInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = () => {
    const input = inputRef.current;
    if (input) {
      const value = inputRef.current?.value;
      if (!checkNumber(value[value.length - 1])) {
        alert("숫자만 입력 가능합니다");
        input.value = value.slice(0, -1);
      }
      input.value = formatNumber(BigInt(value.replace(/,/g, "")));
    }
  };
  const checkNumber = (value: string) => /^[0-9]$/.test(value);
  const formatNumber = (value: bigint) => value.toLocaleString();

  return (
    <div className={cn("w-full ", className)}>
      <label className="block text-sm font-bold text-[#b7b7b7] mb-2">{label}</label>
      <div className="relative w-full bg-white  flex items-center h-[52px] pr-3 border border-solid border-[#b7b7b7] rounded-md overflow-hidden">
        <input
          type={type}
          ref={inputRef}
          {...args}
          onChange={changeHandler}
          className="w-full h-full text-right p-2 pr-[14px] pl-[30%] outline-none font-semibold text-2xl"
        />
        <span className="text-[#b7b7b7] text-sm">Push</span>
      </div>
    </div>
  );
};

export default PushInput;
