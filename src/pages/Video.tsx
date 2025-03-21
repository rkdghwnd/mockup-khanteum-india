import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/video/ProgressBar";
import VideoIconGroup from "../components/video/VideoIconGroup";
import VideoProfile from "../components/video/VideoProfile";
import { useSearchParams } from "react-router-dom";
import { Video as VideoType, videoApi } from "../utils/cookieApi";

const Video = () => {
  const [searchParams] = useSearchParams();
  // url로 전달하는 video 주소와 ID
  const videoSrc = searchParams.get("videoSrc");
  const videoId = searchParams.get("id");
  const videoRef = useRef<HTMLVideoElement>(null);

  // 비디오 플레이 정지에 따른 정지 이모티콘 변화할 상태
  const [isPlay, setIsPlay] = useState(true);
  // 비디오 상세 정보
  const [videoData, setVideoData] = useState<VideoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 비디오 실행 정지 함수
  const videoPlayHandler = () => {
    const video = videoRef.current;
    if (video?.paused) video.play();
    else video?.pause();
    setIsPlay(!video?.paused);
  };

  // 비디오 데이터 가져오기
  useEffect(() => {
    const fetchVideoData = async () => {
      if (videoId) {
        try {
          setIsLoading(true);
          setError(null);
          const response = await videoApi.getVideo(videoId);
          if (response.video) {
            setVideoData(response.video);
          } else {
            setError("비디오를 찾을 수 없습니다.");
          }
        } catch (err) {
          console.error("비디오 데이터 가져오기 오류:", err);
          setError("비디오 데이터를 가져오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  // 비디오 페이지 들어올시 자동 실행
  useEffect(() => {
    videoRef.current?.play();
    if (videoRef.current?.paused) setIsPlay(false);
  }, []);

  // 좋아요 클릭 핸들러
  const handleLike = async () => {
    if (videoId) {
      try {
        await videoApi.likeVideo(videoId);
        // 좋아요 업데이트 후 비디오 데이터 다시 가져오기
        const response = await videoApi.getVideo(videoId);
        if (response.video) {
          setVideoData(response.video);
        }
      } catch (err) {
        console.error("좋아요 오류:", err);
      }
    }
  };

  const actualVideoSrc = videoData?.videoSrc || videoSrc;

  return (
    <section className="w-full h-[calc(100vh-105px)] relative bg-gradient-to-t from-slate-300 to-white via-blue-50">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">비디오 로딩 중...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <video
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            webkit-playsinline="true"
            playsInline={false}
            disablePictureInPicture={false}
            controlsList="nodownload"
            loop={true}
            ref={videoRef}
            autoPlay
          >
            <source src={actualVideoSrc || ""} type="video/mp4" />
          </video>
          <div className="absolute w-full left-0 top-0 h-full z-10">
            <div className="mt-2 " onClick={(e) => e.stopPropagation()}>
              {/* push 들어가는 곳에 서버에서 받는 push값 */}
              <p className="cursor-pointer font-semibold text-[16px] text-center text-white">
                {videoData ? videoData.views : 345} VIEWS
              </p>
            </div>
            <div
              className="w-full h-[calc(100%-183px)]"
              onClick={videoPlayHandler}
            ></div>
            <div
              className="absolute bottom-0 h-[150px] w-full z-20 "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full h-[100px]">
                <div className="w-5/6 relative">
                  <VideoProfile
                    userName={videoData?.userName || "사용자"}
                    title={videoData?.title || "제목 없음"}
                    description={videoData?.description || "설명 없음"}
                  />
                </div>
                <VideoIconGroup
                  likeCount={videoData?.likes || 0}
                  onLike={handleLike}
                />
              </div>
              {/* 비디오 재생바(비디오 ref, 이모티콘 바꿀 실행중 상태, 비디오 실행 함수 넘김) */}
              <ProgressBar
                videoRef={videoRef}
                isPlay={isPlay}
                videoPlayHandler={videoPlayHandler}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Video;
