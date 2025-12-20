"use client";

import Tab from "@/components/Tab";
import MapView from "./MapView";
import NodeView from "./NodeView";
import PlanInfo from "./PlanInfo";
import { ViewMode, ViewModeNames } from "../_consts/viewMode";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface PlanMainContentProps {
  readOnly?: boolean;
}

// TODO: readOnlyに応じて編集不可にする
function PlanMainContent({}: PlanMainContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.TIMELINE);

  const handleChangeViewMode = (newMode: string) => {
    setViewMode(newMode as ViewMode);
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <PlanInfo />
      <div className="flex flex-col gap-4 flex-none items-start h-[800px] overflow-hidden">
        <Tab
          id={"view-mode"}
          tabList={Object.entries(ViewModeNames).map(([id, name]) => ({
            value: id,
            itemContent: name,
          }))}
          value={viewMode}
          onChange={handleChangeViewMode}
        />
        <div className="flex flex-1 self-stretch min-h-0">
          <AnimatePresence>
            {viewMode === ViewMode.TIMELINE && (
              <motion.div
                className="flex gap-4 flex-1"
                initial={{ opacity: 0, x: -500 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -500 }}>
                <NodeView />
                <MapView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default PlanMainContent;
