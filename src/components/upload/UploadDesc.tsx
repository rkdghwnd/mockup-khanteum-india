import { cn } from "../../utils/util";

const UploadDesc = ({ className }: { className?: string }) => {
  return (
    <div className={cn("text-xs", className)}>
      <p className="font-medium">Upload a Video</p>
      <p className="text-[9px] pl-2 pt-2 text-[#b7b7b7]">
        ※ You can only upload videos of your talents. Also, you need to upload a video that identifies your face, If not, you may be disadvantaged by
        everyone's start-up audition, so please refer to it. If you do not register a thumbnail separately, the image captured from the video will be
        used.
      </p>
    </div>
  );
};

export default UploadDesc;
