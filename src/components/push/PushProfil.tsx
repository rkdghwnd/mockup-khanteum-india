import { randomCount } from "../../utils/util";

const PushProfil = () => {
  return (
    <div className="flex flex-col  w-full min-h-[180px] md:min-h-[160px] mt-10 bg-white rounded-xl box-border shadow-[0px_2px_6px_rgba(0,0,0,0.18)]">
      <div className="flex items-center mjustify-center w-full h-4/5 box-border py-5">
        <div className="w-full md:w-2/5 min-w-[80px] h-full flex items-center justify-center">
          <img
            src="avatar-1.png"
            className="md:w-[96px] md:h-[96px] w-[69px] h-[69px] rounded-full object-cover shadow-[0px_6px_15px_rgba(0,0,0,0.22)] border border-solid border-white"
          />
        </div>
        <div className=" w-full h-full flex flex-col justify-center pl-4 pr-10">
          <h2 className="font-bold text-lg text-right md:text-left">Amit</h2>
          <div className="hidden justify-between mt-3  md:flex ">
            <span className="text-sm">Received Push</span>
            <span className="text-lg font-semibold">{randomCount(1000000).toLocaleString()}</span>
          </div>
          <div className="hidden justify-between md:flex ">
            <span className="text-sm">The Push that i made</span>
            <span className="text-lg font-semibold">{randomCount(10000).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-1/5 px-10">
        <div className="flex justify-between md:hidden">
          <span className="text-sm">Received Push</span>
          <span className="text-lg font-semibold">{randomCount(1000000).toLocaleString()}</span>
        </div>
        <div className="flex justify-between md:hidden">
          <span className="text-sm">The Push that i made</span>
          <span className="text-lg font-semibold">{randomCount(10000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PushProfil;
