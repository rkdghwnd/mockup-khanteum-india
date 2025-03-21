import { ChangeEvent, RefObject, useEffect, useState } from "react";

type UploadIntroduceProps = {
  placeholder?: string;
  maxLength?: number;
  targetRef: RefObject<HTMLTextAreaElement>;
  onChange?: (value: string) => void;
};

const UploadIntroduce = ({
  placeholder,
  maxLength = 100,
  targetRef,
  onChange,
}: UploadIntroduceProps) => {
  const [introduce, setIntroduce] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxLength);
    setIntroduce(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.value = introduce;
    }
  }, [introduce, targetRef]);

  return (
    <div className="mt-3 pb-3 w-full">
      <div className="relative w-full h-[82px] shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white rounded-lg">
        <textarea
          ref={targetRef}
          placeholder={placeholder}
          className="w-full h-[75px] resize-none p-2 outline-none rounded-lg"
          onChange={handleChange}
          value={introduce}
        />
        <div className="absolute bottom-1 right-2 text-[10px] text-[#929292]">
          {introduce.length} / {maxLength}
        </div>
      </div>
    </div>
  );
};

export default UploadIntroduce;
