import { Link } from "react-router-dom";
// import RightArrowIcon from "../../icons/RightArrowIcon";
import { cn, randomCount } from "../../utils/util";
import Thumbnail from "./Thumbnail";
import { Swiper, SwiperSlide } from "swiper/react";
import { clsxm } from "../../utils/clsxm";

type VideoListProps = {
  title: string;
  video: { thumbnail: string; videoSrc: string; id?: string }[];
  className?: string;
  isProfile?: boolean;
  onDelete?: (videoId: string) => void;
};
const VideoList = ({
  title,
  video,
  className,
  isProfile = false,
}: // onDelete,
VideoListProps) => {
  return (
    <section className={cn("w-full px-5 h-auto", className)}>
      <div className="flex justify-between w-full">
        <h2 className="text-[15px] font-medium text-[#303030]">{title}</h2>
        {/* {!isProfile && <RightArrowIcon />} */}
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
        {/* 비디오 DUMMY데이터로 그리는 중 추후 서버에서 받은 값으로(썸네일은 src로 넘김 count heart도) video 주소 관련 데이터를 url 파람으로 */}
        {video.map(({ thumbnail, videoSrc, id }, idx) => (
          <SwiperSlide key={idx + Math.random()}>
            <div
              className={clsxm(
                "relative",
                isProfile
                  ? "min-w-[45%] mr-3 h-[160px]"
                  : "min-w-[30%] mr-2 h-[150px]"
              )}
            >
              {/* 프로필 페이지에서만 삭제 버튼 표시 */}
              {/* {isProfile && onDelete && (
                <button
                  onClick={() => onDelete(id || idx.toString())}
                  className="absolute top-1 right-1 z-10 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              )} */}
              <Link to={`/video?videoSrc=${videoSrc}${id ? `&id=${id}` : ""}`}>
                <Thumbnail
                  src={thumbnail}
                  count={(idx + 1) * randomCount(1000)}
                  heart={(idx + 1) * randomCount(1000)}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VideoList;
