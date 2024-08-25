import { Link } from "react-router-dom";
import RightArrowIcon from "../../icons/RightArrowIcon";
import { cn, randomCount } from "../../utils/util";
import Thumbnail from "./Thumbnail";
import { Swiper, SwiperSlide } from "swiper/react";

type VideoListProps = {
  title: string;
  videoSrc: string[];
  className?: string;
};
const VideoList = ({ title, videoSrc, className }: VideoListProps) => {
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
            slidesPerView: 1.8,
            spaceBetween: 3,
          },
          360: {
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
          <SwiperSlide key={idx + Math.random()}>
            <Link to={"/"}>
              <Thumbnail src={src} count={(idx + 1) * randomCount(1000)} heart={(idx + 1) * randomCount(1000)} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VideoList;
