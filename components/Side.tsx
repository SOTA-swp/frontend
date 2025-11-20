import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "./CommonButton";

function Side() {
  return (
    <div
      className={
        "rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary"
      }>
      <CommonButton variant="text" icon={<MdAccountCircle />}>
        ユーザー
      </CommonButton>
      <CommonButton variant="text" icon={<MdAirplanemodeActive />}>
        作った計画
      </CommonButton>
      <CommonButton variant="text" icon={<MdFavorite />}>
        お気に入り
      </CommonButton>
      <div className="h-px border border-border"></div>
      <CommonButton variant="text" icon={<MdSearch />}>
        検索
      </CommonButton>
    </div>
  );
}

export default Side;
