import { useState } from "react";
import ProfileBanner from "../components/profile/ProfileBanner";
import ProfileTab from "../components/profile/ProfileTab";
import User from "../components/profile/User";
import { DUMMYUSER, VIDEODUMMY } from "../utils/DUMMY";
import VideoList from "../components/Home/VideoList";

const Profile = () => {
  // 현재 무슨 탭인지 저장 상태
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <section className="min-h-[calc(100vh-105px)]">
      <ProfileBanner />
      <User {...DUMMYUSER} />
      <ProfileTab currentTab={currentTab} setTab={setCurrentTab} />

      <VideoList title="art" video={VIDEODUMMY.art} isProfile />
      <VideoList title="dance" video={VIDEODUMMY.dance} isProfile />
    </section>
  );
};

export default Profile;
