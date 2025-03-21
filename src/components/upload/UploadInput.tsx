import { ChangeEvent, ReactNode, RefObject, useRef } from "react";
import { cn } from "../../utils/util";

type UploadInputProps = {
  className?: string;
  targetRef: RefObject<HTMLInputElement>;
  placeholder?: string;
  emoticon?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
};

const UploadInput = ({
  className,
  targetRef,
  placeholder,
  emoticon,
  onChange,
  accept,
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  //화면용 input 클릭시 file input으로 돌리기
  const clickHandler = () => {
    targetRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (inputRef.current && files) {
      inputRef.current.placeholder = files[0].name;
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label
      className={cn(
        "relative flex justify-between w-full cursor-pointer",
        className
      )}
    >
      <input
        type="file"
        className="hidden"
        ref={targetRef}
        onChange={changeHandler}
        accept={accept}
      />
      <input
        className=" w-full h-[40px] px-3 cursor-pointer shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white mr-5  rounded-lg text-[#626262] text-sm"
        readOnly
        placeholder={placeholder}
        onClick={clickHandler}
        ref={inputRef}
      />
      <span
        className={cn(
          "w-[43px] h-[34px] bg-white flex items-center justify-center rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.18)]",
          {
            ["hidden"]: !emoticon,
          }
        )}
      >
        {emoticon && emoticon}
      </span>
    </label>
  );
};

export default UploadInput;
