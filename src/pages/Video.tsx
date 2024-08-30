import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/video/ProgressBar";
import VideoIconGroup from "../components/video/VideoIconGroup";
import VideoProfile from "../components/video/VideoProfile";
import { useSearchParams } from "react-router-dom";

const Video = () => {
  const [searchParams] = useSearchParams();
  // url로 전달하는 video 주소(추후 외부로 들어나지 않게)
  const videoSrc = searchParams.get("videoSrc");
  const videoRef = useRef<HTMLVideoElement>(null);
  //비디오 플레이 정지에 따른 정지 이모티콘 변화할 상태
  const [isPlay, setIsPlay] = useState(true);

  //비디오 실행 정지 함수
  const videoPlayHandler = () => {
    const video = videoRef.current;
    if (video?.paused) video.play();
    else video?.pause();
    setIsPlay(!video?.paused);
  };

  //비디오 페이지 들어올시 자동 실행
  useEffect(() => {
    videoRef.current?.play();
    if (videoRef.current?.paused) setIsPlay(false);
  }, []);

  return (
    <section className="w-full h-[calc(100vh-105px)] relative bg-gradient-to-t from-slate-300 to-white via-blue-50">
      <video
        className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        webkit-playsinline="true"
        playsInline={false}
        disablePictureInPicture={false}
        controlsList="nodownload"
        loop={true}
        ref={videoRef}
      >
        <source src={videoSrc ? videoSrc : ""} type="video/mp4" />
      </video>
      <div className="absolute w-full left-0 top-0 h-full z-10">
        <div className="mt-2 " onClick={(e) => e.stopPropagation()}>
          {/* push 들어가는 곳에 서버에서 받는 push값 */}
          <p className="cursor-pointer font-semibold text-[16px] text-center text-white">{345} PUSH</p>
        </div>
        <div className="w-full h-[calc(100%-183px)]" onClick={videoPlayHandler}></div>
        <div className="absolute bottom-0 h-[150px] w-full z-20 " onClick={(e) => e.stopPropagation()}>
          <div className="flex w-full h-[100px]">
            <div className="w-5/6 relative">
              <VideoProfile />
            </div>
            <VideoIconGroup />
          </div>
          {/* 비디오 재생바(비디오 ref, 이모티콘 바꿀 실행중 상태, 비디오 실행 함수 넘김) */}
          <ProgressBar videoRef={videoRef} isPlay={isPlay} videoPlayHandler={videoPlayHandler} />
        </div>
      </div>
    </section>
  );
};

export default Video;
