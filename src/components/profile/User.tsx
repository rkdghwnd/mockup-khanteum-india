import FacebookIcon from "../../icons/FacebookIcon";
import InstaIcon from "../../icons/InstaIcon";
import PencilIcon from "../../icons/PencilIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import SettingIcon from "../../icons/SettingIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import { FOLLOWERS } from "../../utils/DUMMY";

type UserProps = {
  name: string;
  email: string;
  followers: number;
  push: number;
  views: number;
};

const User = ({ name, email, followers, push, views }: UserProps) => {
  // profile icon 위치에 이미지
  // settigIcon으로 프로필 세팅이동 함수나 link연결
  // pencilIcon으로 이메일 변경 함수 ( 현재 이메일 위치에서 input이 등장하며 원래 email이 input안에 값이 자동으로 들어가는거 추천)
  // 각 snsicon에 <link>로 url연결 새탭으로 띄우기 추천
  // user의 정보는 prop로 받기
  return (
    <div className="flex w-full items-center justify-center mt-3 min-h-[150px]">
      <div className=" w-4/5 min-w-[320px] h-full flex items-center flex-col">
        <div className="flex w-full items-center justify-center">
          <div className="w-[81px] h-full rounded-full overflow-hidden mr-3">
            <ProfileIcon className="w-full h-full" />
          </div>
          <div className="h-full">
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{name} </span>{" "}
              <button className="">
                <SettingIcon />
              </button>
            </div>
            <div className="relative">
              <span className="text-[#245aab] text-sm">{email}</span>{" "}
              <button className="absolute top-1/2 -translate-y-1/2 -right-8 w-[16px] h-[16px]">
                <PencilIcon className="w-full h-full" />
              </button>
            </div>
            <div className="w-full flex space-x-4 mt-2">
              <FacebookIcon />
              <InstaIcon />
              <YoutubeIcon />
            </div>
          </div>
        </div>
        <div className="w-full  flex justify-evenly mt-5">
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{followers}</span>
            <p className="text-center">Follwers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{push}</span>
            <p className="text-center">
              Total
              <span className="md:inline hidden"> Accumulation</span> Push
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold">{views}</span>
            <p className="text-center">View Count</p>
          </div>
        </div>
        <div className="flex -space-x-2 mt-2">
          {FOLLOWERS.map((avatar, idx, arr) => (
            <div key={idx} style={{ zIndex: arr.length - idx }} className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <img src={avatar} className="w-full h-full" />
            </div>
          ))}
          <span className="w-[30px] h-[30px] flex items-center justify-center space-x-[2px] rounded-full overflow-hidden drop-shadow-[2px_1px_4px_rgba(0,0,0,0.25)] bg-[#707070] border-2 border-white border-solid">
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
            <span className="w-[3.5px] h-[3.5px] bg-white rounded-full"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
