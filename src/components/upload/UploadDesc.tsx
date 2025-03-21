import { ChangeEvent } from "react";

type UploadDescProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

const UploadDesc = ({ className, value, onChange }: UploadDescProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full mt-4 ${className || ""}`}>
      <div className="text-base">Title</div>
      <input
        type="text"
        className="w-full h-[40px] px-3 shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white mt-1 rounded-lg text-[#626262]"
        placeholder="Please enter a title"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadDesc;
