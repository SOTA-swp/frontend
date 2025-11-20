"use client";
import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "../CommonButton";
import { HEADER_HEIGHT } from "../CommonHeader";
import PATH from "@/consts/PATH";
import { usePathname } from "next/navigation";

function Side() {
  const path = usePathname();

  return (
    <div className="shrink-0">
      <ul
        className="sticky rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary bg-paper"
        style={{ top: HEADER_HEIGHT + 20 }}>
        <CommonButton
          variant="text"
          icon={<MdAccountCircle />}
          href={PATH.HOME}>
          ユーザー{path}
        </CommonButton>
        <CommonButton variant="text" icon={<MdAirplanemodeActive />}>
          作った計画
        </CommonButton>
        <CommonButton variant="text" icon={<MdFavorite />}>
          お気に入り
        </CommonButton>
        <div className="h-px border border-border rounded-full" />
        <CommonButton variant="text" icon={<MdSearch />}>
          検索
        </CommonButton>
      </ul>
    </div>
  );
}

export default Side;
