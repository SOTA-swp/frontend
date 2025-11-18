"use client";
import React from "react";
import CommonText from "./CommonText";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import { MdAdd, MdNotifications, MdSearch } from "react-icons/md";
import IconButton from "./IconButton";
import UserIcon from "./UserIcon";
import { createMockUser } from "@/types/user";
import { motion, Variants } from "motion/react";
import LAYER from "@/consts/LAYER";
import clsx from "clsx";

export const HEADER_HEIGHT = "110px";

const curtainVariants: Variants = {
  hover: {
    width: "",
    transition: { type: "spring", stiffness: 400, damping: 50 },
  },
};

function CommonHeader() {
  // TODO: 認証ができたらユーザーデータを受け取るように修正
  const userData = createMockUser();
  const [scrolled, setScrolled] = React.useState(false);

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
      className={`
        sticky
        flex
        top-0
    `}
      style={{
        zIndex: LAYER.HEADER,
        height: HEADER_HEIGHT,
      }}>
      <motion.div
        className={clsx(
          `
        flex 
        flex-1
        items-center 
        justify-between
        border
        border-primary
        rounded-2xl
        bg-paper
        overflow-hidden
        `.trim(),
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

        <ul
          className="
          flex
          items-center
          gap-8
          pr-4
          ">
          <li>
            <IconButton icon={<MdAdd />} variant="iconOnly" />
          </li>
          <li>
            <IconButton icon={<MdSearch />} variant="iconOnly" />
          </li>
          <li>
            <IconButton icon={<MdNotifications />} variant="iconOnly" />
          </li>
          <li className="flex items-center">
            <UserIcon userData={userData} />
          </li>
        </ul>
      </motion.div>
    </nav>
  );
}

export default CommonHeader;
