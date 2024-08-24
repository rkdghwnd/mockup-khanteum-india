import { useId, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

const Banner = () => {
  const id = useId();
  const [index, setIndex] = useState(1);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const swiperRef = useRef<SwiperRef>(null);

  const slideChange = (idx: number) => {
    swiper?.slideToLoop(idx);
  };

  const changeIndex = (idx: number) => {
    if (idx < 1) idx = 2;
    if (idx > 2) idx = 1;
    setIndex(idx);
  };

  return (
    <section className=" h-[400px] w-full mt-3 ">
      <div className="w-full h-[90%] overflow-hidden flex flex-col ">
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          className={`w-full h-full flex justify-center items-center`}
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={1}
          loop={true}
          onSlideChange={(e) => changeIndex(e.realIndex)}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          ref={swiperRef}
          breakpoints={{
            320: {
              slidesPerView: 1.3,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide className="overflow-hidden rounded-lg">
            <img src="banner1.png" alt="" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden rounded-lg">
            <img src="banner0.png" alt="" className="w-[full] h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden rounded-lg">
            <img src="banner1.png" alt="" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden rounded-lg">
            <img src="banner0.png" alt="" className="w-[full] h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="h-[20px] flex space-x-2 items-center justify-center mt-2">
        {[1, 2].map((v) => (
          <label key={v + Math.random()} className="w-[12px] h-[12px]  rounded-full bg-[#d9d9d9] cursor-pointer flex items-center justify-center ">
            <input type="radio" name="slideTabmenu" className="hidden peer" id={`${id}${v}`} checked={index === v} onChange={() => slideChange(v)} />
            <span className="inline-block w-[12px] h-[12px] rounded-full bg-[#d04bff] transition-all transform duration-500 scale-0 peer-checked:scale-100 " />
          </label>
        ))}
      </div>
    </section>
  );
};

export default Banner;
