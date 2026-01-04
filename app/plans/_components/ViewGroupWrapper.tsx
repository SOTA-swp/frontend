import { ReactNode } from "react";
import { VIEW_MODE, ViewMode } from "../_consts/viewMode";
import { motion } from "motion/react";

interface ViewGroupWrapperProps {
  viewMode: ViewMode;
  children: ReactNode;
}

function ViewGroupWrapper({ viewMode, children }: ViewGroupWrapperProps) {
  const xInitial = `${viewMode === VIEW_MODE.TIMELINE ? "-" : ""}100%`;

  return (
    <motion.div
      className="absolute inset-0 flex gap-4 flex-1"
      initial={{ opacity: 0, x: xInitial }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: xInitial }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

export default ViewGroupWrapper;
