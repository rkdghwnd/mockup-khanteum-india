import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/util";
import ProfileIcon from "../icons/ProfileIcon";

const avatarVariants = cva("relative rounded-full flex items-center justify-center box-border bg-default overflow-hidden", {
  variants: {
    size: {
      default: "w-[32px] h-[32px]",
      xs: "w-[24px] h-[24px]",
      sm: "w-[28px] h-[28px]",
      lg: "w-[40px] h-[40px]",
      xl: "w-[64px] h-[64px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type AvatarProps = {
  src: string;
  className?: string;
} & VariantProps<typeof avatarVariants>;

const Avatar = ({ src, size, className }: AvatarProps) => {
  return (
    <label className="relative">
      <div className={cn(avatarVariants({ size, className }))}>
        {src === "" ? <ProfileIcon className="w-full h-full" /> : <img src={src} style={{ objectFit: "cover" }} />}
      </div>
    </label>
  );
};

export default Avatar;
