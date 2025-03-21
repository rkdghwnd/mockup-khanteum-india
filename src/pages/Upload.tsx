import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCategory from "../components/upload/SelectCategory";
import UploadContent from "../components/upload/UploadContent";
import UploadCopyright from "../components/upload/UploadCopyright";
import UploadDesc from "../components/upload/UploadDesc";
import UploadProfile from "../components/upload/UploadProfile";
import { CATEGORY } from "../utils/DUMMY";
import { videoApi } from "../utils/cookieApi";

const Upload = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 업로드할 비디오 정보 상태
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORY[0]);
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState("모든 권리 보유");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  // 비디오 업로드 핸들러
  const handleUpload = async () => {
    // 필수 입력값 검증
    if (!title) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!description) {
      setError("설명을 입력해주세요.");
      return;
    }

    if (!thumbnailFile) {
      setError("썸네일을 선택해주세요.");
      return;
    }

    if (!videoFile) {
      setError("비디오를 선택해주세요.");
      return;
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("copyright", copyright);
    formData.append("thumbnail", thumbnailFile);
    formData.append("video", videoFile);

    try {
      setIsLoading(true);
      setError(null);

      // API 호출
      await videoApi.uploadVideo(formData);

      // 업로드 성공 시 홈으로 이동
      navigate("/");
    } catch (err) {
      console.error("비디오 업로드 오류:", err);
      setError(
        err instanceof Error ? err.message : "비디오 업로드에 실패했습니다."
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
            {isLoading ? "처리 중..." : "Registration"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Upload;
