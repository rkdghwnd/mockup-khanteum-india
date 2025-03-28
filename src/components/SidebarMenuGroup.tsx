import AnnounceIcon from "../icons/AnnounceIcon";
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
      <SidebarMenu
        link="/profile"
        title="My Profile"
        emoji={<SideProfileIcon fill />}
      />
      {/* <SidebarMenu link="/walletPassword" title="My Wallet" emoji={<WalletIcon fill />} /> */}
      <SidebarMenu
        link="/myFavorite"
        title="My Favorite"
        emoji={<BookmarkIcon fill />}
      />
      {/* <SidebarMenu link="/chart" title="Ranking" emoji={<RankingIcon fill />} /> */}
      <SidebarMenu link="/notify" title="Notify" emoji={<NotiIcon fill />} />
      {/* <SidebarMenu link="/vote" title="Vote" emoji={<VoteIcon fill />} /> */}
      <SidebarMenu
        link="/notice"
        title="Notice"
        emoji={<AnnounceIcon fill />}
      />
    </div>
  );
};

export default SidebarMenuGroup;
