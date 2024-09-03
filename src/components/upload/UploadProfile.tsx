import { Link } from "react-router-dom";
import InfinityIcon from "../../icons/InfinityIcon";
import SquareEscapeIcon from "../../icons/SquareEscapeIcon";

const UploadProfile = () => {
  return (
    <div className="w-full flex justify-center p-3 mt-4 mb-2">
      <div className=" flex flex-col items-center">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
          <img src="avatar-2.png" className="w-full h-full object-cover" />
        </div>
        <p className="text-sm font-semibold">PLATINUM</p>
      </div>
      <div className="relative ml-3">
        <p className="text-nowrap font-semibold text-[#464646] flex items-center space-x-3">
          0GB /
          <span className="ml-1">
            <InfinityIcon />
          </span>
          <Link to={"#none"}>
            <SquareEscapeIcon />
          </Link>
        </p>
        <p className="text-sm">Free to Use</p>
        <p className="text-sm">Until December 31, 2024</p>
      </div>
    </div>
  );
};

export default UploadProfile;
