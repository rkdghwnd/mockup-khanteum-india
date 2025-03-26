import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategory from "../components/upload/SelectCategory";
import UploadContent from "../components/upload/UploadContent";
import UploadCopyright from "../components/upload/UploadCopyright";
import UploadDesc from "../components/upload/UploadDesc";
import UploadProfile from "../components/upload/UploadProfile";
import { CATEGORY } from "../utils/DUMMY";
import { videoService } from "../services/video.service";
import { useAuth } from "../context/AuthContext";

const Upload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 업로드할 비디오 정보 상태
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORY[0]);
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState("All Rights Reserved");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  // 비디오 업로드 핸들러
  const handleUpload = async () => {
    // 인증 확인
    if (!user) {
      setError("Login is required.");
      return;
    }

    // 필수 입력값 검증
    if (!title) {
      setError("Please enter a title.");
      return;
    }

    if (!description) {
      setError("Please enter a description.");
      return;
    }

    if (!thumbnailFile) {
      setError("Please select a thumbnail image.");
      return;
    }

    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Supabase 서비스 호출
      const { success, error } = await videoService.uploadVideo({
        title,
        description,
        category,
        videoFile,
        thumbnailFile,
        copyright,
      });

      if (!success || error) {
        throw new Error(error || "Video upload failed");
      }

      // 업로드 성공 시 홈으로 이동
      navigate("/");
    } catch (err) {
      console.error("비디오 업로드 오류:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Video upload failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-105px)] flex flex-col items-center md:w-5/6 md:mx-auto">
      <h1 className="text-center pt-2 font-bold text-xl text-[#464646]">
        Upload Video
      </h1>
      <div className="bg-[url('bg_pc.png')] bg-center bg-cover min-h-[calc(100vh-150px)] pb-2 md:h-[calc(100vh-157px)] w-[calc(100%-20px)] mt-4 px-5 rounded-3xl shadow-[0px_-2px_12px_1px_rgba(2,69,149,0.25)] flex flex-col items-center">
        {error && (
          <div className="w-full mt-4 p-2 text-red-500 text-sm bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <UploadProfile />
        <SelectCategory selectList={CATEGORY} onSelect={handleCategorySelect} />
        <UploadDesc value={title} onChange={setTitle} />
        <UploadContent
          onThumbnailChange={setThumbnailFile}
          onVideoChange={setVideoFile}
          onDescriptionChange={setDescription}
        />
        <UploadCopyright value={copyright} onChange={setCopyright} />
        <div className="mt-4">
          <button
            className="w-[140px] h-[40px] rounded-[20px] bg-[#464646] text-white text-base font-medium disabled:opacity-50"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Registration"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Upload;
