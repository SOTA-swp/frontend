"use client";
import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "../../../../components/CommonButton";
import { HEADER_HEIGHT } from "../CommonHeader";
import PATH from "@/consts/PATH";
import { SIDE_VIEWS, SIDE_VIEWS_TYPE, useSideStore } from "./sideStore";

const ITEM_DATA: {
  label: string;
  icon: React.ReactNode;
  path: string | ((userId: string) => string);
  sideViewType: SIDE_VIEWS_TYPE;
}[] = [
  {
    label: "ユーザー",
    icon: <MdAccountCircle />,
    path: PATH.USER,
    sideViewType: SIDE_VIEWS.USER,
  },
  {
    label: "作った計画",
    icon: <MdAirplanemodeActive />,
    path: PATH.USER,
    sideViewType: SIDE_VIEWS.PLANS,
  },
  {
    label: "お気に入り",
    icon: <MdFavorite />,
    path: PATH.USER,
    sideViewType: SIDE_VIEWS.FAVORITES,
  },
  {
    label: "検索",
    icon: <MdSearch />,
    path: PATH.SEARCH,
    sideViewType: SIDE_VIEWS.SEARCH,
  },
];

function Side() {
  const { currentView } = useSideStore();

  return (
    <div className="shrink-0">
      <ul
        className="sticky rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary bg-paper"
        style={{ top: HEADER_HEIGHT + 20 }}>
        <CommonButton variant="text" icon={<MdAccountCircle />} href={PATH.TOP}>
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
      </ul>
    </div>
  );
}

export default Side;
