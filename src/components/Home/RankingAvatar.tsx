import { Link } from "react-router-dom";
type RankingAvatarProps = {
  user: string;
  profile: string;
};
const RankingAvatar = ({ user, profile }: RankingAvatarProps) => {
  return (
    <Link to={`/profile?user=${user}`} className="inline-block relative">
      <div className={`w-[100px] h-[100px] md:w-[134px] md:h-[134px]  rounded-full overflow-hidden`}>
        <img src={profile} className="w-full h-full object-cover" />
      </div>
      <span className="text-center inline-block w-full font-bold text-[16px] truncate">{user}</span>
    </Link>
  );
};

export default RankingAvatar;
