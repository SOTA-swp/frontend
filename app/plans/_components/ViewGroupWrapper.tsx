"use client";

import { ReactNode } from "react";
import { VIEW_MODE, ViewMode } from "../_consts/viewMode";
import { motion } from "motion/react";
import { Group, useDefaultLayout } from "react-resizable-panels";

interface ViewGroupWrapperProps {
  viewMode: ViewMode;
  children: ReactNode;
}

function ViewGroupWrapper({ viewMode, children }: ViewGroupWrapperProps) {
  const xInitial = `${viewMode === VIEW_MODE.TIMELINE ? "-" : ""}100%`;
  const { defaultLayout, onLayoutChange } = useDefaultLayout({
    id: `main-content-layout-${viewMode}`,
    storage: localStorage,
  });

  return (
    <motion.div
      className="absolute inset-0 flex-1"
      initial={{ opacity: 0, x: xInitial }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: xInitial }}
      transition={{ duration: 0.4, ease: "easeInOut" }}>
      <Group
        defaultLayout={defaultLayout}
        onLayoutChange={onLayoutChange}
        className="gap-2">
        {children}
      </Group>
    </motion.div>
  );
}

export default ViewGroupWrapper;
