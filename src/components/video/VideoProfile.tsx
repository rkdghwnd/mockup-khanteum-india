import ProfileIcon from "../../icons/ProfileIcon";

const VideoProfile = () => {
  return (
    <div className="absolute bottom-0 px-5 left-0 w-full h-[82px] text-white">
      <div className="flex items-center space-x-3">
        <span className="w-[39px] h-[39px] ">
          {/* 아이콘 또는 유저 프로필 사진 */}
          <ProfileIcon fill className="w-full h-full" />
        </span>
        <div>
          <p>Khanteum official</p>
          <p className="text-sm">2024.07.16</p>
        </div>
      </div>
      <p className="text-sm">{1051} Views </p>
      <p className="text-sm truncate">
        Push the Dreamer you want to support! What is the patented Kantum Push system? Learn how to use Push correctly and support the Dreamer you
        want to cheer on! 🤩
      </p>
    </div>
  );
};

export default VideoProfile;
