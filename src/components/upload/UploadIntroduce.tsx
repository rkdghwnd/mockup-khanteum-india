import { ChangeEvent, RefObject, TextareaHTMLAttributes, useState } from "react";
import { cn } from "../../utils/util";

type UploadIntroduceProps = {
  className?: string;
  targetRef: RefObject<HTMLTextAreaElement>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const UploadIntroduce = ({ className, targetRef, ...args }: UploadIntroduceProps) => {
  const [len, setLen] = useState(0);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLen(e.currentTarget.value.length);
  };

  return (
    <>
      <textarea
        className={cn("w-full h-[100px] resize-none shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] rounded-lg mt-5 p-2", className)}
        ref={targetRef}
        onChange={changeHandler}
        {...args}
      />
      <p className="text-right text-sm font-semibold">{len}/100</p>
    </>
  );
};

export default UploadIntroduce;
