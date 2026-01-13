import { User } from "@/types/user";
import React from "react";
import CommonText from "./CommonText";
import { MdChevronRight } from "react-icons/md";
import clsx from "clsx";
import Link from "next/link";
import PATH from "@/consts/PATH";
import UserIcon from "./UserIcon";

interface UserLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  userData: Partial<User> | null;
  enableEmail?: boolean;
  rightIcon?: boolean;
  enableLink?: boolean;
}

function UserLink({
  userData,
  enableEmail = true,
  rightIcon = true,
  enableLink = true,
  ...props
}: UserLinkProps) {
  const content = (
    <>
      <UserIcon username={userData?.username || "?"} />
      <div className="min-w-0">
        <CommonText className="truncate">
          {userData?.username || "ユーザー名"}
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

  return (
    <button {...props} className={commonStyle}>
      {content}
    </button>
  );
}

export default UserLink;
