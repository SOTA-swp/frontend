"use client";
import { ReactNode, useState } from "react";
import { createPlanStore, PlanStore } from ".";
import { PlanStoreContext } from "./hook";

export interface PlanDataProviderProps {
  children: ReactNode;
  initData?: Partial<PlanStore>;
}

export const PlanStoreProvider = ({
  children,
  initData,
}: PlanDataProviderProps) => {
  const [store] = useState(() => createPlanStore(initData));
  return (
    <PlanStoreContext.Provider value={store}>
      {children}
    </PlanStoreContext.Provider>
  );
};

export default PlanStoreProvider;
