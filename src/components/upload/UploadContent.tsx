import { ChangeEvent, useRef, useState } from "react";
import UploadInput from "./UploadInput";
import CameraIcon from "../../icons/CameraIcon";
import CamcorderIcon from "../../icons/CamcorderIcon";
import UploadIntroduce from "./UploadIntroduce";

type UploadContentProps = {
  onThumbnailChange: (file: File | null) => void;
  onVideoChange: (file: File | null) => void;
  onDescriptionChange: (description: string) => void;
};

const UploadContent = ({
  onThumbnailChange,
  onVideoChange,
  onDescriptionChange,
}: UploadContentProps) => {
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(videoFile, thumbnailFile);

    const files = e.target.files;
    if (files && files.length > 0) {
      setThumbnailFile(files[0]);
      onThumbnailChange(files[0]);
    } else {
      setThumbnailFile(null);
      onThumbnailChange(null);
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
      onVideoChange(files[0]);
    } else {
      setVideoFile(null);
      onVideoChange(null);
    }
  };

  const handleDescriptionChange = (value: string) => {
    onDescriptionChange(value);
  };

  return (
    <div className="w-full mt-8">
      <UploadInput
        targetRef={thumbnailRef}
        className="mb-3"
        placeholder="Choose the Thumbnail"
        emoticon={<CameraIcon className="w-[25px] h-[17px]" />}
        onChange={handleThumbnailChange}
        accept="image/*"
      />
      <UploadInput
        targetRef={videoRef}
        placeholder="Choose the Video"
        emoticon={<CamcorderIcon className="w-[25px] h-[17px]" />}
        onChange={handleVideoChange}
        accept="video/*"
      />
      <UploadIntroduce
        placeholder="Please enter the video introduction"
        targetRef={introduceRef}
        maxLength={100}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default UploadContent;
