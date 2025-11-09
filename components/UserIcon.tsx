import UserType from "@/types/user";
import React from "react";
import CommonText from "./CommonText";
import { MdChevronRight } from "react-icons/md";
import clsx from "clsx";

function UserIcon({
  userData,
  rightIcon = true,
  ...props
}: {
  userData: UserType;
  rightIcon?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        `
        relative
        flex 
        items-center
        gap-2
        cursor-pointer 
        select-none 
        max-w-[300px]
        text-left
        overflow-hidden
        group
        `,
        props.className
      )}>
      <div
        className="
            flex
            items-center
            rounded-full
            border-2
            border-accent
            shrink-0
            ">
        {
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={userData.picture} className="w-9 h-9" />
        }
      </div>
      <div className="min-w-0">
        <CommonText className="truncate">{userData.name}</CommonText>
        <CommonText className="text-xs text-text-secondary text-nowrap truncate">
          {userData.email}
        </CommonText>
      </div>

      {rightIcon && (
        <MdChevronRight
          className="
      relative 
      text-2xl 
      text-text-secondary 
      shrink-0 
      left-0 
      group-hover:left-1 
        transition-all
        transition-duration-200
      "
        />
      )}
    </button>
  );
}

export default UserIcon;
