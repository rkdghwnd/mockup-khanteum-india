import { Link } from "react-router-dom";
import RightArrowIcon from "../../icons/RightArrowIcon";
import { cn } from "../../utils/util";
import Thumbnail from "./Thumbnail";
import { Swiper, SwiperSlide } from "swiper/react";

type VidoeListProps = {
  title: string;
  videoSrc: string[];
  className?: string;
};
const randomCount = () => Math.floor(Math.random() * 1000) + 1;
const VideoList = ({ title, videoSrc, className }: VidoeListProps) => {
  return (
    <section className={cn("w-full px-5 h-auto", className)}>
      <div className="flex justify-between w-full">
        <h2 className="text-[15px] font-medium text-[#303030]">{title}</h2>
        <RightArrowIcon />
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        grabCursor={true}
        className="w-[95%] overflow-hidden mt-4"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
        }}
      >
        {videoSrc.map((src, idx) => (
          <SwiperSlide>
            <Link to={"/"} key={idx + Math.random()}>
              <Thumbnail src={src} count={(idx + 1) * randomCount()} heart={(idx + 1) * randomCount()} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VideoList;
