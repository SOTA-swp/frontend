"use client";

import Tab from "@/components/Tab";
import MapView from "./MapView";
import NodeView from "./NodeView";
import PlanInfo from "./PlanInfo";

interface PlanMainContentProps {
  readOnly?: boolean;
}

// TODO: readOnlyに応じて編集不可にする
function PlanMainContent({}: PlanMainContentProps) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <PlanInfo />
      <div className="flex flex-col gap-4 flex-none items-start h-[800px] overflow-hidden">
        <Tab tabList={[{ label: "a", itemContent: "00" }]} />
        <div className="flex gap-4 flex-1 self-stretch min-h-0">
          <NodeView />
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default PlanMainContent;
