import { useId, useState } from "react";

const Banner = () => {
  const id = useId();
  const [index, setIndex] = useState(1);

  return (
    <section className=" h-[400px] w-full mt-3 ">
      <div className="w-full h-[90%] overflow-hidden flex flex-col ">
        <div className={` w-auto h-full flex space-x-3 items-center relative right-[86.5%] `}>
          <div className="bg-slate-500 h-full min-w-[90%] max-w-[650px]  rounded-3xl overflow-hidden flex justify-center items-center">
            <img src="banner1.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="bg-slate-500 h-full min-w-[90%] max-w-[650px]  rounded-3xl overflow-hidden flex justify-center items-center">
            <img src="banner0.png" alt="" className="w-[full] h-full object-cover" />
          </div>
          <div className="bg-slate-500 h-full min-w-[90%] max-w-[650px]  rounded-3xl overflow-hidden flex justify-center items-center">
            <img src="banner1.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="bg-slate-500 h-full min-w-[90%] max-w-[650px]  rounded-3xl overflow-hidden flex justify-center items-center">
            <img src="banner0.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="h-[20px] flex space-x-2 items-center justify-center mt-2">
        {[1, 2].map((v) => (
          <label key={v + Math.random()} className="w-[12px] h-[12px]  rounded-full bg-[#d9d9d9] cursor-pointer flex items-center justify-center ">
            <input type="radio" name="slideTabmenu" className="hidden peer" id={`${id}${v}`} checked={index === v} onChange={() => setIndex(v)} />
            <span className="inline-block w-[12px] h-[12px] rounded-full bg-[#d04bff] transition-all transform duration-500 scale-0 peer-checked:scale-100 " />
          </label>
        ))}
      </div>
    </section>
  );
};

export default Banner;
