import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/video/ProgressBar";
import VideoIconGroup from "../components/video/VideoIconGroup";
import VideoProfile from "../components/video/VideoProfile";
import { useSearchParams } from "react-router-dom";

import { type Video, videoService } from "../services/video.service";

const Video = () => {
  const [searchParams] = useSearchParams();
  // url로 전달하는 video 주소와 ID
  const videoSrc = searchParams.get("videoSrc");
  const videoId = searchParams.get("id");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 비디오 플레이 정지에 따른 정지 이모티콘 변화할 상태
  const [isPlay, setIsPlay] = useState(true);
  // 비디오 상세 정보
  const [videoData, setVideoData] = useState<Video | null>(null);
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
          const { video, error: videoError } = await videoService.getVideo(
            videoId
          );

          if (videoError) {
            throw new Error(videoError);
          }

          if (video) {
            setVideoData(video);

            // 비디오 데이터가 로드되면 videoRef에 소스 설정
            if (videoRef.current && video.videoSrc) {
              videoRef.current.src = video.videoSrc;
              videoRef.current.load();
              videoRef.current.play();
            }
          } else {
            setError("Video not found.");
          }
        } catch (err) {
          console.error("비디오 데이터 가져오기 오류:", err);
          setError(
            err instanceof Error ? err.message : "Failed to load video data."
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const actualVideoSrc = videoData?.videoSrc || videoSrc;

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-[calc(100vh-105px)] flex flex-col items-center justify-center p-4">
  //       <h1 className="text-2xl font-bold mb-4">
  //         동영상을 시청하려면 로그인이 필요합니다
  //       </h1>
  //       <Link
  //         to="/login"
  //         className="px-6 py-2 bg-[#00d4c8] text-white rounded-full"
  //       >
  //         로그인 하기
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <section className="w-full h-[calc(100vh-105px)] overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          {/* 비디오 스크린 */}
          <div className="w-full h-full absolute top-0 left-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              // muted
              loop
              src={actualVideoSrc || ""}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute w-full left-0 top-0 h-full z-10">
            <div className="mt-2 " onClick={(e) => e.stopPropagation()}>
              {/* push 들어가는 곳에 서버에서 받는 push값 */}
              <p className="cursor-pointer font-semibold text-[16px] text-center text-white">
                {videoData ? videoData.views : 0} VIEWS
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
                    createdAt={videoData?.createdAt || 0}
                  />
                </div>
                <VideoIconGroup viewCount={videoData?.views || 0} />
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
