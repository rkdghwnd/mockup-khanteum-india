import AppleIcon from "../../icons/AppleIcon";
import KakaoIcon from "../../icons/KakaoIcon";
import NaverIcon from "../../icons/NaverIcon";

const SocialLogin = () => {
  return (
    <div className=" my-[50px] w-full flex flex-col items-center">
      <p>Easy Login</p>
      <div className=" flex justify-center items-center space-x-5 mt-5">
        <button className="w-[50px] h-[50px] rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.18)] flex items-center justify-center bg-white overflow-hidden">
          <NaverIcon fill />
        </button>
        <button className="w-[50px] h-[50px] rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.18)] flex items-center justify-center bg-white overflow-hidden">
          <KakaoIcon fill />
        </button>
        <button className="w-[50px] h-[50px] rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.18)] flex items-center justify-center bg-white overflow-hidden">
          <AppleIcon />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
