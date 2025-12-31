import { User } from "@/types/user";
import React from "react";
import CommonText from "./CommonText";
import { MdChevronRight } from "react-icons/md";
import clsx from "clsx";
import { getFirstChar } from "@/utils/removeEmoji";
import Link from "next/link";
import PATH from "@/consts/PATH";

interface UserIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  userData: Partial<User> | null;
  enableEmail?: boolean;
  rightIcon?: boolean;
  enableLink?: boolean;
}

function UserIcon({
  userData,
  enableEmail = true,
  rightIcon = true,
  enableLink = true,
  ...props
}: UserIconProps) {
  const content = (
    <>
      <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent shrink-0">
        {
          // <img src={userData.picture} className="w-9 h-9" />
        }
        <p>{getFirstChar(userData?.name || "ユーザー名")}</p>
      </div>
      <div className="min-w-0">
        <CommonText className="truncate">
          {userData?.name || "ユーザー名"}
        </CommonText>
        {enableEmail && (
          <CommonText className="text-xs text-text-secondary text-nowrap truncate">
            {userData?.email || "メールアドレス"}
          </CommonText>
        )}
      </div>

      {rightIcon && (
        <MdChevronRight className="relative text-2xl text-text-secondary shrink-0 left-0 group-hover:left-1 transition-all transition-duration-200" />
      )}
    </>
  );
  const commonStyle = clsx(
    "relative flex items-center gap-2 cursor-pointer select-none max-w-75 text-left overflow-hidden group",
    props.className
  );

  if (enableLink) {
    return (
      <Link href={PATH.USER(userData?.id)} className={commonStyle}>
        {content}
      </Link>
    );
  }

  return <button {...props} className={commonStyle}></button>;
}

export default UserIcon;
