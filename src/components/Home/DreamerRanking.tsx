import { Swiper, SwiperSlide } from "swiper/react";
import RightArrowIcon from "../../icons/RightArrowIcon";
import RankingAvatar from "./RankingAvatar";
import { DUMMYRANKING } from "../../utils/DUMMY";

const DreamerRanking = () => {
  return (
    <section className="w-full px-5">
      <div className="flex justify-between w-full">
        {/* <h2 className="text-[15px] font-medium text-[#303030]">2024 Everyone's Startup Dreamer Ranking</h2> */}
        <RightArrowIcon />
      </div>
      <Swiper
        className="max-h-[205px] w-[95%] overflow-hidden  mt-4"
        slidesPerView={3}
        spaceBetween={10}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 2,
          },
        }}
      >
        {DUMMYRANKING.map((ranking, idx) => (
          <SwiperSlide key={ranking.user + idx}>
            <RankingAvatar {...ranking} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default DreamerRanking;
