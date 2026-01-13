import ComponentSize from "@/types/componentSize";
import { getHueFromString } from "@/utils/color";
import { getFirstChar } from "@/utils/removeEmoji";
import { cva } from "class-variance-authority";

const userIconStyles = cva(
  "flex items-center justify-center rounded-full shrink-0 overflow-clip text-paper select-none",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[0.6rem]",
        sm: "h-8 w-8 text-[0.8rem]",
        md: "h-10 w-10 text-[1rem]",
        lg: "h-12 w-12 text-[1.2rem]",
        xl: "h-14 w-14 text-[1.4rem]",
      } satisfies Record<ComponentSize, string>,
    },
  }
);

interface UserIconProps {
  username: string;
  size?: ComponentSize;
}

function UserIcon({ username, size = "md" }: UserIconProps) {
  const classes = userIconStyles({ size });
  return (
    <div
      className={classes}
      style={{
        backgroundColor: `hsl(${getHueFromString(username)}, 60%, 60%)`,
      }}>
      {getFirstChar(username)}
    </div>
  );
}

export default UserIcon;
