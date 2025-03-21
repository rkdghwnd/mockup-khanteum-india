import { ChangeEvent, useEffect, useRef, useState } from "react";
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

  // 파일 미리보기 URL 상태
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // 파일 변경 시 미리보기 생성
  useEffect(() => {
    if (thumbnailFile) {
      const objectUrl = URL.createObjectURL(thumbnailFile);
      setThumbnailPreview(objectUrl);

      // 컴포넌트 언마운트 시 URL 정리
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [thumbnailFile]);

  useEffect(() => {
    if (videoFile) {
      const objectUrl = URL.createObjectURL(videoFile);
      setVideoPreview(objectUrl);

      // 컴포넌트 언마운트 시 URL 정리
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [videoFile]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setThumbnailFile(files[0]);
      onThumbnailChange(files[0]);
    } else {
      setThumbnailFile(null);
      setThumbnailPreview(null);
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
      setVideoPreview(null);
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

      {/* 썸네일 미리보기 */}
      {thumbnailPreview && (
        <div className="my-2 max-w-[200px] mx-auto">
          <p className="text-xs text-gray-500 mb-1">Thumbnail Preview:</p>
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="w-full rounded-md shadow-sm border border-gray-200"
          />
        </div>
      )}

      <UploadInput
        targetRef={videoRef}
        placeholder="Choose the Video"
        emoticon={<CamcorderIcon className="w-[25px] h-[17px]" />}
        onChange={handleVideoChange}
        accept="video/*"
      />

      {/* 비디오 미리보기 */}
      {videoPreview && (
        <div className="my-2">
          <p className="text-xs text-gray-500 mb-1">Video Preview:</p>
          <video
            src={videoPreview}
            controls
            className="w-full max-h-[150px] rounded-md shadow-sm border border-gray-200"
          />
        </div>
      )}

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
