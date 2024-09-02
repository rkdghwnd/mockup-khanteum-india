import { Link } from "react-router-dom";
import BlankHeart from "../../icons/BlankHeart";
import FingerIcon from "../../icons/FingerIcon";
import MessageIcon from "../../icons/MessageIcon";
import ShareIcon from "../../icons/ShareIcon";
import BookmarkIcon from "../BookmarkIcon";

const VideoIconGroup = () => {
  // 대부분의 영상에 대한 정보를 prop으로 내려받아서 push할 때 링크로 정보를 함께 넘겨주면 좋음
  return (
    <div className="w-[65px] flex flex-col justify-evenly items-center absolute right-2 bottom-1/2 h-[200px] ">
      <ShareIcon />
      <BookmarkIcon insideBlank className="w-[30px] h-[30px]" />
      <MessageIcon />
      <BlankHeart />
      <Link to={"/push"}>
        <FingerIcon className="w-[30px] h-[30px]" />
      </Link>
    </div>
  );
};
export default VideoIconGroup;
