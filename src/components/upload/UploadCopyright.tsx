import { ChangeEvent } from "react";

type UploadCopyrightProps = {
  value: string;
  onChange: (value: string) => void;
};

const UploadCopyright = ({ value, onChange }: UploadCopyrightProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full mt-4">
      <div className="text-base">Copyright</div>
      <input
        type="text"
        className="w-full h-[40px] px-3 shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white mt-1 rounded-lg text-[#626262]"
        placeholder="Please enter copyright information"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default UploadCopyright;
