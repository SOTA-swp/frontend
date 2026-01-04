"use client";

import Tab from "@/components/Tab";
import MapView from "./MapView";
import NodeView from "./NodeView";
import PlanInfo from "./PlanInfo";
import { VIEW_MODE, ViewModeNames, ViewMode } from "../_consts/viewMode";
import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import IdeaSpaceView from "./IdeaSpaceView";
import ViewGroupWrapper from "./ViewGroupWrapper";
import HomeButton from "./HomeButton";
import { APIProvider } from "@vis.gl/react-google-maps";
import { usePlanStore } from "../_store/hook";
import { PlanCollaborator } from "./PlanCollaborator";

interface PlanMainContentProps {
  readOnly?: boolean;
  planId?: string;
}

function PlanMainContent({ readOnly = false, planId }: PlanMainContentProps) {
  const setReadOnly = usePlanStore((state) => state.setReadOnly);
  const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODE.TIMELINE);
  useMemo(() => {
    setReadOnly(readOnly);
  }, [readOnly, setReadOnly]);

  const handleChangeViewMode = (newMode: string) => {
    setViewMode(newMode as ViewMode);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      {planId && <PlanCollaborator planId={planId} />}
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
    </APIProvider>
  );
}

export default PlanMainContent;
