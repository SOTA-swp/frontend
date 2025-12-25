"use client";

import Tab from "@/components/Tab";
import MapView from "./MapView";
import NodeView from "./NodeView";
import PlanInfo from "./PlanInfo";
import { VIEW_MODE, ViewModeNames, ViewModeType } from "../_consts/viewMode";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import IdeaSpaceView from "./IdeaSpaceView";
import ViewGroupWrapper from "./ViewGroupWrapper";
import HomeButton from "./HomeButton";

interface PlanMainContentProps {
  readOnly?: boolean;
}

// TODO: readOnlyに応じて編集不可にする
function PlanMainContent({}: PlanMainContentProps) {
  const [viewMode, setViewMode] = useState<ViewModeType>(VIEW_MODE.TIMELINE);

  const handleChangeViewMode = (newMode: string) => {
    setViewMode(newMode as ViewModeType);
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <HomeButton />
      <PlanInfo />
      <div className="flex flex-col gap-4 flex-none items-start h-[800px]">
        <Tab
          id={"view-mode"}
          tabList={Object.entries(ViewModeNames).map(([id, name]) => ({
            value: id,
            itemContent: name,
          }))}
          value={viewMode}
          onChange={handleChangeViewMode}
        />
        <div className="relative flex flex-1 self-stretch min-h-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {viewMode === VIEW_MODE.TIMELINE ? (
              <ViewGroupWrapper key="timeline" viewMode={VIEW_MODE.TIMELINE}>
                <NodeView />
                <MapView />
              </ViewGroupWrapper>
            ) : (
              <ViewGroupWrapper
                key="idea-space"
                viewMode={VIEW_MODE.IDEA_SPACE}>
                <IdeaSpaceView />
              </ViewGroupWrapper>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default PlanMainContent;
