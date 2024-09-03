import { useState } from "react";
import Radio from "../Radio";

const UploadCopyright = () => {
  const radioName = "musicCopy";
  const [select, setSelect] = useState("");

  const changeHandler = (label: string) => setSelect(label);

  return (
    <div className="w-full">
      <p className="text-sm md:text-base font-medium">Music Copyrightable Works Usage Information</p>
      <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-1 pl-2 mt-2 text-sm text-[#464646]">
        <Radio label="AR (MR + Song)" name={radioName} dataId={0} changeFn={changeHandler} />
        <Radio label="MR" name={radioName} dataId={1} changeFn={changeHandler} />
        <Radio label="Play Personally" className="md:row-start-2" changeFn={changeHandler} name={radioName} dataId={2} />
        <Radio label="Not Using the Sound Source" className="md:row-start-2 md:col-span-2" changeFn={changeHandler} name={radioName} dataId={3} />
      </div>
      <div className="text-[9px] text-[#b7b7b7] pl-3 mt-2">
        <p>※ In Khanteum, for the rights of authors, only domestic music Copyrightable works can be used and uilized for video content.</p>
        <p>Also, please note that karaoke accompaniment sound source is temporarily unavailable</p>
      </div>

      {select !== "Not Using the Sound Source" && (
        <div className="mt-2">
          <input
            placeholder="Please enter the title of the song"
            className="relative w-[calc(100%-45px)] h-[40px] px-3 shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white rounded-lg text-[#626262] text-sm"
          />
          <input
            placeholder="Please enter the singer's name"
            className="relative w-[calc(100%-45px)] h-[40px] px-3 mt-2 shadow-[inset_1px_2px_4px_1px_rgba(0,0,0,0.13)] bg-white rounded-lg text-[#626262] text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default UploadCopyright;
