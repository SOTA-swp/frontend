import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "./CommonButton";
import { HEADER_HEIGHT } from "./CommonHeader";
import PATH from "@/consts/PATH";

function Side() {
  return (
    <div className="shrink-0">
      <div
        className="sticky rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary bg-paper"
        style={{ top: HEADER_HEIGHT + 20 }}>
        <CommonButton
          variant="text"
          icon={<MdAccountCircle />}
          href={PATH.HOME}>
          ユーザー
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
      </div>
    </div>
  );
}

export default Side;
