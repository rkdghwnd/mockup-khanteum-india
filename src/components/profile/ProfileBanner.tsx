import CameraIcon from "../../icons/CameraIcon";
import TrashIcon from "../../icons/TrashIcon";

const ProfileBanner = () => {
  return (
    // 나중에 바로 아래 div의 백그라운드에 프로필 배너(서버에서 받아서 넣기)
    <div className="md:h-[400px] h-[145px] bg-black relative">
      <span className="absolute w-[26px] h-[26px] rounded-full top-3 right-3 cursor-pointer flex items-center justify-center pb-1">
        <TrashIcon />
      </span>
      <label className="absolute w-[26px] h-[26px] rounded-full bottom-3 right-3 bg-white flex items-center justify-center pb-1 cursor-pointer">
        <input type="file" name="" id="" className="hidden" />
        <CameraIcon />
      </label>
    </div>
  );
};

export default ProfileBanner;
