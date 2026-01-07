"use client";
import React, { MouseEventHandler, ReactNode } from "react";
import CommonText from "../../../components/CommonText";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import IconButton from "../../../components/IconButton";
import UserLink from "../../../components/UserLink";
import { motion, Variants } from "motion/react";
import LAYER from "@/consts/LAYER";
import clsx from "clsx";
import HEADER_HEIGHT from "../_consts/HEADER_HIGHT";
import { useAppStore } from "@/store/AppStoreProvider";
import { MdAdd, MdSearch, MdNotifications, MdLogout } from "react-icons/md";
import PATH from "@/consts/PATH";
import Notification from "../_components/Notification";
import usePopover from "@/components/popover/usePopover";
import AddPlanModal from "./AddPlanModal";

const curtainVariants: Variants = {
  hover: {
    width: "",
    transition: { type: "spring", stiffness: 400, damping: 50 },
  },
};

function CommonHeader() {
  const userData = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const [scrolled, setScrolled] = React.useState(false);
  const { handleOpen: notificationsOpen, ...notificationsProps } = usePopover(); // 通知用
  const openModal = useAppStore((state) => state.openModal);

  const handleOpenAddPlanModal: MouseEventHandler = () => {
    openModal(<AddPlanModal />);
  };

  const isLoggedIn = !!userData;

  interface HeaderItem {
    key: string;
    icon: ReactNode;
    title: string;
    login: boolean; // ログインしているときのみ表示するかどうか
    onClick?: MouseEventHandler;
    href?: string;
  }
  const items: HeaderItem[] = [
    {
      key: "add",
      icon: <MdAdd />,
      title: "計画追加",
      login: true,
      onClick: handleOpenAddPlanModal,
    },
    {
      key: "search",
      icon: <MdSearch />,
      title: "検索ページ",
      login: false,
      href: PATH.SEARCH,
    },
    {
      key: "notifications",
      icon: <MdNotifications />,
      title: "通知一覧",
      login: true,
      onClick: notificationsOpen,
    },
    {
      key: "logout",
      icon: <MdLogout />,
      title: "ログアウト",
      login: true,
      onClick: logout,
    },
  ];

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="sticky flex top-0"
      style={{
        zIndex: LAYER.HEADER,
        height: HEADER_HEIGHT,
      }}>
      <motion.div
        className={clsx(
          "flex flex-1 items-center justify-between border border-primary rounded-2xl bg-paper overflow-hidden",
          scrolled ? "shadow-md backdrop-blur-lg bg-paper/70" : "shadow-none"
        )}
        animate={{
          margin: scrolled ? 16 : 0,
          marginBottom: 0,
          borderRadius: scrolled ? "" : 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 50 }}>
        <motion.div
          className="relative pl-8 pr-16 cursor-pointer select-none h-full group"
          whileHover={"hover"}>
          <button className="relative h-full flex items-center z-10">
            <CommonText
              level="h2"
              className={`text-primary group-hover:text-paper transition-colors`}>
              {PROJECT_NAME}
            </CommonText>
          </button>

          {/* カーテン */}
          <motion.div
            className={"absolute flex w-[120%] h-full top-0 left-0 "}
            variants={{
              hover: {
                gap: "16px",
                transition: { type: "spring", stiffness: 100, damping: 30 },
              },
            }}
            initial={{ gap: 0 }}>
            <motion.div
              className={`bg-primary w-[80%] h-full shrink-0`}
              variants={curtainVariants}
              initial={{ width: 0 }}
            />
            <motion.div
              className={`bg-primary w-2 h-full`}
              variants={curtainVariants}
              initial={{ width: 0 }}
            />
            <motion.div
              className={`bg-primary w-1 h-full`}
              variants={curtainVariants}
              initial={{ width: 0 }}
            />
          </motion.div>
        </motion.div>

        <ul className="flex items-center gap-8 pr-6">
          {items.map(
            ({ key, onClick, href, icon, login, title }) =>
              (!login || isLoggedIn) && (
                <li key={key}>
                  <IconButton
                    onClick={onClick}
                    href={href}
                    icon={icon}
                    variant={"iconOnly"}
                    color={"gray"}
                    title={title}
                  />
                </li>
              )
          )}
          {isLoggedIn && (
            <li className="flex items-center">
              <UserLink userData={userData} />
            </li>
          )}
        </ul>
      </motion.div>

      <Notification {...notificationsProps} />
    </nav>
  );
}

export default CommonHeader;
