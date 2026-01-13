"use client";

import Tab from "@/components/Tab";
import { ViewMode, ViewModeNames } from "../_consts/viewMode";
import { usePlanStore } from "../_store/hook";

function ViewModeTab() {
  const viewMode = usePlanStore((state) => state.viewMode);
  const setViewMode = usePlanStore((state) => state.setViewMode);

  const handleChangeViewMode = (newMode: string) => {
    setViewMode(newMode as ViewMode);
  };

  return (
    <Tab
      id={"view-mode"}
      tabList={Object.entries(ViewModeNames).map(([id, name]) => ({
        value: id,
        itemContent: name,
      }))}
      value={viewMode}
      onChange={handleChangeViewMode}
    />
  );
}

export default ViewModeTab;
