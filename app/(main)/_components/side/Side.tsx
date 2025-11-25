"use client";
import {
  MdAccountCircle,
  MdAirplanemodeActive,
  MdFavorite,
  MdSearch,
} from "react-icons/md";
import CommonButton from "../../../../components/CommonButton";
import PATH from "@/consts/PATH";
import { SIDE_VIEWS, SIDE_VIEWS_TYPE, useSideStore } from "./sideStore";
import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import { motion } from "motion/react";
import clsx from "clsx";
import HEADER_HEIGHT from "../../_consts/HEADER_HIGHT";

const getPageId = (userId: string, pageId: string) => {
  return `${PATH.USER(userId)}#${pageId}`;
};

const ITEM_DATA: {
  label: string;
  icon: React.ReactNode;
  path: string | ((userId: string) => string);
  sideViewType: SIDE_VIEWS_TYPE;
}[] = [
  {
    label: "ユーザー",
    icon: <MdAccountCircle />,
    path: (userId) => getPageId(userId, MAIN_PAGE_IDs.USER),
    sideViewType: SIDE_VIEWS.USER,
  },
  {
    label: "作った計画",
    icon: <MdAirplanemodeActive />,
    path: (userId) => getPageId(userId, MAIN_PAGE_IDs.PLANS),
    sideViewType: SIDE_VIEWS.PLANS,
  },
  {
    label: "お気に入り",
    icon: <MdFavorite />,
    path: (userId) => getPageId(userId, MAIN_PAGE_IDs.FAVORITES),
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
  const pathName = usePathname();
  const { userId } = useParams();
  const { currentView } = useSideStore();

  return (
    <div className="shrink-0">
      <ul
        className="sticky rounded-md w-[290px] flex flex-col gap-4 py-4 px-4 border border-primary bg-paper"
        style={{ top: HEADER_HEIGHT + 16 }}>
        {ITEM_DATA.map((item) => {
          const isCurrentView = currentView === item.sideViewType;
          return (
            <React.Fragment key={item.sideViewType}>
              {item.sideViewType === "search" && (
                <div className="h-px border border-border rounded-full" />
              )}
              <li className="relative flex">
                {isCurrentView && (
                  <motion.div
                    layoutId="sideAccent"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute bg-primary inset-0 rounded-xl"
                  />
                )}
                <CommonButton
                  variant="text"
                  color={isCurrentView ? "gray" : "primary"}
                  icon={item.icon}
                  href={
                    typeof item.path === "string"
                      ? item.path
                      : item.path((userId as string) || "me")
                  }
                  fullWidth
                  className={clsx(isCurrentView && "text-paper")}>
                  {item.label}
                </CommonButton>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default Side;
