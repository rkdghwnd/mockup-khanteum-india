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
  const [muted, setMuted] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [remain, setRemain] = useState(0);

  const mutedHandler = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video?.muted;
      setMuted(video.muted);
    }
  };
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

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

  useEffect(() => {
    if (videoRef.current) setMuted(videoRef.current.muted);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      if (video) {
        const time = video.currentTime;
        const duration = video.duration;
        setPlayTime((time / duration) * 100);
        setRemain(duration - time);
      }
    };

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
