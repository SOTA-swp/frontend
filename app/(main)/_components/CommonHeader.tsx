"use client";
import React from "react";
import CommonText from "../../../components/CommonText";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import { MdAdd, MdLogout, MdNotifications, MdSearch } from "react-icons/md";
import IconButton from "../../../components/IconButton";
import UserIcon from "../../../components/UserIcon";
import { motion, Variants } from "motion/react";
import LAYER from "@/consts/LAYER";
import clsx from "clsx";
import HEADER_HEIGHT from "../_consts/HEADER_HIGHT";
import { useAppStore } from "@/store/AppStoreProvider";
import PATH from "@/consts/PATH";

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

  const isLoggedIn = !!userData;

  const iconItems: {
    icon: React.ReactNode;
    login: boolean; // ログインしているときのみ表示するかどうか
    title: string;
    onClick?: () => void;
    href?: string;
  }[] = [
    {
      icon: <MdAdd />,
      login: true,
      title: "計画追加",
      onClick: () => {
        // TODO: 計画追加処理
        console.log("Add clicked");
      },
    },
    {
      icon: <MdSearch />,
      login: false,
      title: "検索ページへ",
      href: PATH.SEARCH,
    },
    {
      icon: <MdNotifications />,
      login: true,
      title: "通知一覧",
      onClick: () => {
        // TODO: 通知表示処理
        console.log("Notifications clicked");
      },
    },
    {
      icon: <MdLogout />,
      login: true,
      title: "ログアウト",
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
          {iconItems.map(
            ({ onClick, href, icon, login, title }, i) =>
              (!login || isLoggedIn) && (
                <li key={i}>
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
              <UserIcon userData={userData} />
            </li>
          )}
        </ul>
      </motion.div>
    </nav>
  );
}

export default CommonHeader;
