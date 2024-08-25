import { Link } from "react-router-dom";
import { DUMMYRANKING } from "../../utils/DUMMY";
import { cn, randomCount } from "../../utils/util";

type ChartRankingProps = {
  rank: typeof DUMMYRANKING;
};

const ChartRanking = ({ rank }: ChartRankingProps) => {
  return (
    <div className="w-full mt-4 ">
      <div className="min-h-[280px] w-full rounded-3xl  bg-[#6b49f5] ">
        <img className="p-5" src="everyones_logo.png" />
        <div className=" flex justify-evenly w-full">
          {rank.map(({ user, profile }, idx) => (
            <div key={idx}>
              <Link
                to={`/profile?name=${user}`}
                className={cn("w-[82px] min-h-[95px] pb-2 box-border overflow-hidden pt-3 px-2 bg-white rounded-2xl flex flex-col items-center", {
                  ["mt-10"]: idx !== 1,
                })}
              >
                <img src={profile} className="w-[52px] h-[52px] rounded-full" />
                <div className="flex flex-col  items-center ">
                  <p className="truncate w-[70px] text-center font-bold">{user}</p>
                  <p className="text-wrap text-sm font-bold text-[#FFA400]">{randomCount(10000000).toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center ">
          <img src="rank_stair.png" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default ChartRanking;
