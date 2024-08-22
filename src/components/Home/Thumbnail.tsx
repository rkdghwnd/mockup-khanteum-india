import FingerIcon from "../../icons/FingerIcon";
import HeartIcon from "../../icons/HeartIcon";

type ThumbnailProps = {
  src: string;
  heart: number;
  count: number;
};

const Thumbnail = ({ src, heart, count }: ThumbnailProps) => {
  return (
    <div className="relative md:w-[216px] md:h-[302px] w-[152px] h-[212px] bg-red-50 overflow-hidden rounded-lg inline-block">
      <img src={src} className="w-full h-full object-cover" />
      <div className="absolute left-[11px] bottom-[13px]">
        <span className="flex items-center text-[18px] font-medium text-white">
          <HeartIcon />
          <span className="ml-2">{heart > 999 ? `${(heart / 1000).toFixed(1)}K` : heart}</span>
        </span>
        <span className="flex items-center text-[18px] text-white">
          <FingerIcon />
          <span className="ml-2">{count > 999 ? `${(heart / 1000).toFixed(1)}K` : count}</span>
        </span>
      </div>
    </div>
  );
};

export default Thumbnail;
