import { useRef } from "react";
import UploadInput from "./UploadInput";
import CameraIcon from "../../icons/CameraIcon";
import CamcorderIcon from "../../icons/CamcorderIcon";
import UploadIntroduce from "./UploadIntroduce";

const UploadContent = () => {
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full mt-8">
      <UploadInput
        targetRef={thumbnailRef}
        className="mb-3"
        placeholder="Choose the Thumbnail"
        emoticon={<CameraIcon className="w-[25px] h-[17px]" />}
      />
      <UploadInput targetRef={videoRef} placeholder="Choose the Video" emoticon={<CamcorderIcon className="w-[25px] h-[17px]" />} />
      <UploadIntroduce placeholder="Please enter the video introduction" targetRef={introduceRef} maxLength={100} />
    </div>
  );
};

export default UploadContent;
