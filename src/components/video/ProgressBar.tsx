import { MouseEvent, RefObject, useEffect, useState } from "react";
import FullScreenIcon from "../../icons/FullScreenIcon";
import VideoPlayIcon from "../../icons/VideoPlayIcon";
import VolumeIcon from "../../icons/VolumeIcon";
import PausedIcon from "../../icons/PausedIcon";
import MutedIcon from "../../icons/MutedIcon";
import { cn } from "../../utils/util";

type ProgressBarType = {
  videoRef: RefObject<HTMLVideoElement>;
  isPlay: boolean;
  videoPlayHandler: () => void;
};

const ProgressBar = ({ videoRef, isPlay, videoPlayHandler }: ProgressBarType) => {
  // 음소거 상태
  const [muted, setMuted] = useState(false);
  // 현재 비디오 재생시간
  const [playTime, setPlayTime] = useState(0);
  // 비디오 남은 시간
  const [remain, setRemain] = useState(0);

  // 음소거 바꾸는 함수
  const mutedHandler = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video?.muted;
      setMuted(video.muted);
    }
  };
  // 비디오 재생 남은시간 계산하는 함수
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  // 재생바 클릭시 해당 위치로 재생바 옮겨주는 함수(클릭 위치랑 요소 넓이 계산)
  const moveProgress = (event: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = event.currentTarget;
    const clickX = event.nativeEvent.offsetX;
    const progressWidth = progressBar.clientWidth;
    if (clickX < 2) return;
    if (video) {
      const newTime = (clickX / progressWidth) * video.duration;
      video.currentTime = newTime;
    }
  };

  // 첫 마운트시 현재 음소거 상태인지 세팅
  useEffect(() => {
    if (videoRef.current) setMuted(videoRef.current.muted);
  }, []);

  // 비디오 재생시간에 따른 재생 바 이동 세팅 useEffect
  useEffect(() => {
    const video = videoRef.current;
    // time은 현재 재생 시간 , duration은 전체 시간 아래 계산을 통해 상태에 세팅
    const updateTime = () => {
      if (video) {
        const time = video.currentTime;
        const duration = video.duration;
        setPlayTime((time / duration) * 100);
        setRemain(duration - time);
      }
    };
    // 비디오 요소에서 시간이 업데이트 되면 updateTime 실행으로 상태 업데이트
    video?.addEventListener("timeupdate", updateTime);

    return () => {
      video?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  return (
    <div className="flex w-full h-[50px] items-center px-2 box-border">
      <button onClick={videoPlayHandler}>{isPlay ? <PausedIcon /> : <VideoPlayIcon />}</button>

      <button className="mr-1" onClick={mutedHandler}>
        {muted ? <MutedIcon /> : <VolumeIcon />}
      </button>
      <div className="flex items-center   w-[calc(100%-10px)] h-[20px] cursor-pointer box-border" onClick={moveProgress}>
        <div className="relative w-full h-[4px]">
          <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
          {/* width 길이를 계산한 현재 시간 상태로 늘려서 재생바 이동 애니메이션 */}
          <div className={cn(` relative h-full bg-[#858585] transition-all `)} style={{ width: `${playTime}%` }}>
            <span
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[6px] rounded-full bg-[#c7c7c7]"
            ></span>
          </div>
        </div>
      </div>
      <div className="ml-2">{formatTimer(remain)}</div>
      <FullScreenIcon />
    </div>
  );
};

export default ProgressBar;
