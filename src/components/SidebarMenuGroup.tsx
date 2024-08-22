import AnnounceIcon from "../icons/AnnounceIcon";
import LastTimerIcon from "../icons/LastTimerIcon";
import NotiIcon from "../icons/NotiIcon";
import RankingIcon from "../icons/RankingIcon";
import SideProfileIcon from "../icons/SideProfileIcon";
import VoteIcon from "../icons/VoteIcon";
import WalletIcon from "../icons/WalletIcon";
import BookmarkIcon from "./BookmarkIcon";
import SidebarMenu from "./SidebarMenu";

const SidebarMenuGroup = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <SidebarMenu link="/profile" title="나의 프로필" emoji={<SideProfileIcon fill />} />
      <SidebarMenu link="/wallet" title="내 지갑" emoji={<WalletIcon fill />} />
      <SidebarMenu link="/" title="나의 즐겨찾기" emoji={<BookmarkIcon fill />} />
      <SidebarMenu link="/chart" title="랭킹" emoji={<RankingIcon fill />} />
      <SidebarMenu link="/#none" title="알림" emoji={<NotiIcon fill />} />
      <SidebarMenu link="/#none" title="투표" emoji={<VoteIcon fill />} />
      <SidebarMenu link="/#none" title="공지사항" emoji={<AnnounceIcon fill />} />
      <SidebarMenu link="/#none" title="지난 시즌 보기" emoji={<LastTimerIcon fill />} />
    </div>
  );
};

export default SidebarMenuGroup;
