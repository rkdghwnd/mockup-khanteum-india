import RightArrowIcon from "../../icons/RightArrowIcon";
import RankingAvatar from "./RankingAvatar";

const DUMMYRANKING = [
  { user: "LeeSeonghyuk", profile: "avatar-1.png" },
  { user: "MammaMia", profile: "avatar-2.png" },
  { user: "DASROO", profile: "avatar-3.png" },
  { user: "POPO", profile: "avatar-4.png" },
  { user: "INSURE", profile: "avatar-5.png" },
  { user: "daily_j995", profile: "avatar-6.png" },
];

const DreamerRanking = () => {
  return (
    <section className="w-full px-5">
      <div className="flex justify-between w-full">
        <h2 className="text-[15px] font-medium text-[#303030]">2024 Everyone's Startup Dreamer Ranking</h2>
        <RightArrowIcon />
      </div>
      <div className="max-h-[205px] w-[95%] overflow-hidden whitespace-nowrap space-x-4 mt-4">
        {DUMMYRANKING.map((ranking) => (
          <RankingAvatar {...ranking} key={ranking.user} />
        ))}
      </div>
    </section>
  );
};

export default DreamerRanking;
