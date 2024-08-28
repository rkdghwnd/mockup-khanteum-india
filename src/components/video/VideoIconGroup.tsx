import BlankHeart from "../../icons/BlankHeart";
import MessageIcon from "../../icons/MessageIcon";
import ShareIcon from "../../icons/ShareIcon";
import BookmarkIcon from "../BookmarkIcon";

const VideoIconGroup = () => {
  return (
    <div className="w-[65px] flex flex-col justify-evenly items-center absolute right-2 bottom-1/2 h-[200px] ">
      <ShareIcon />
      <BookmarkIcon insideBlank className="w-[30px] h-[30px]" />
      <MessageIcon />
      <BlankHeart />
    </div>
  );
};
export default VideoIconGroup;
