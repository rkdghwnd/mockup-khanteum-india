import ShareIcon from "../../icons/ShareIcon";
import MessageIcon from "../../icons/MessageIcon";

type VideoIconGroupProps = {
  viewCount: number;
};

const VideoIconGroup = ({ viewCount }: VideoIconGroupProps) => {
  return (
    <div className="w-1/6 h-full flex flex-col justify-end items-center space-y-5">
      <div className="flex flex-col items-center">
        <button className="cursor-pointer">
          <MessageIcon />
        </button>
        <span className="text-white text-xs">{viewCount}</span>
      </div>
      <button className="cursor-pointer">
        <ShareIcon />
      </button>
    </div>
  );
};

export default VideoIconGroup;
export type { VideoIconGroupProps };
