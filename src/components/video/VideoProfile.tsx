import ProfileIcon from "../../icons/ProfileIcon";

interface VideoProfileProps {
  userName: string;
  title: string;
  description: string;
  createdAt: string | number;
}

const VideoProfile = ({
  userName,
  title,
  description,
  createdAt,
}: VideoProfileProps) => {
  return (
    <div className="absolute bottom-0 px-5 left-0 w-full h-[82px] text-white">
      <div className="flex items-center space-x-3">
        <span className="w-[39px] h-[39px] ">
          {/* 아이콘 또는 유저 프로필 사진 */}
          <ProfileIcon fill className="w-full h-full" />
        </span>
        <div>
          <p>{userName}</p>
          <p className="text-sm">
            {new Date(createdAt).toLocaleString("ko-KR", {
              timeZone: "Asia/Kolkata",
            })}
          </p>
        </div>
      </div>
      <p className="text-sm">{title}</p>
      <p className="text-sm truncate">{description}</p>
    </div>
  );
};

export default VideoProfile;
