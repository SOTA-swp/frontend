import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "./CommonButton";
import { hover } from "motion";

function Side() {
  return (
    <div
      className={
        "rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary"
      }
    >
      <CommonButton
        text="ユーザー"
        variant="text"
        icon={<MdAccountCircle />}
      ></CommonButton>
      <CommonButton
        text="作った計画"
        variant="text"
        icon={<MdAirplanemodeActive />}
      ></CommonButton>
      <CommonButton
        text="お気に入り"
        variant="text"
        icon={<MdFavorite />}
      ></CommonButton>
      <div className="h-px border border-border"></div>
      <CommonButton
        text="検索する"
        variant="text"
        icon={<MdSearch />}
      ></CommonButton>
    </div>
  );
}

export default Side;
