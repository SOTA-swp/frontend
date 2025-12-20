import GrowIconButton from "@/components/GrowIconButton";
import LAYER from "@/consts/LAYER";
import clsx from "clsx";
import { motion, Variants } from "motion/react";
import { ReactNode, useState } from "react";
import {
  MdEditNote,
  MdGroup,
  MdKeyboardArrowDown,
  MdUpload,
} from "react-icons/md";

interface QuickMenuItem {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const items: QuickMenuItem[] = [
  {
    id: "edit-basic-info",
    icon: <MdEditNote />,
    label: "基本情報を編集",
    onClick: () => {},
  },
  {
    id: "export",
    icon: <MdUpload />,
    label: "エクスポート",
    onClick: () => {},
  },
  {
    id: "group",
    icon: <MdGroup />,
    label: "グループ",
    onClick: () => {},
  },
];

const containerVariants: Variants = {
  open: {
    width: "auto",
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  closed: {
    width: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  open: { opacity: 1, x: 0, rotate: 0 },
  closed: { opacity: 0, x: 50, rotate: 90 },
};

function QuickMenu() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(true);

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleAnimationStart = () => {
    setActive(false);
  };

  const handleAnimationEnd = () => {
    setActive(true);
  };

  return (
    <nav
      className={clsx(
        "fixed top-4 right-0",
        active ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={{ zIndex: LAYER.POPOVER }}>
      <div
        className={clsx(
          "flex gap-1 shadow-md rounded-l-full overflow-clip",
          open ? "bg-paper" : "bg-paper/50 backdrop-blur-sm"
        )}>
        <button
          className="flex items-center justify-center p-2 text-2xl text-text-secondary border-r border-r-border hover:bg-text-secondary/10 transition-colors"
          onClick={handleToggleOpen}>
          <span
            className={clsx(
              "transition-transform",
              open ? "rotate-0" : "rotate-90"
            )}>
            <MdKeyboardArrowDown />
          </span>
        </button>
        <motion.ul
          variants={containerVariants}
          initial={false}
          animate={open ? "open" : "closed"}
          className={clsx("")}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationEnd}>
          <div className="flex gap-3 p-3">
            {items.map((item) => (
              <motion.li key={item.id} variants={itemVariants}>
                {<GrowIconButton icon={item.icon}>{item.label}</GrowIconButton>}
              </motion.li>
            ))}
          </div>
        </motion.ul>
      </div>
    </nav>
  );
}

export default QuickMenu;
