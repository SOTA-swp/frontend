import { createContext, useContext } from "react";
import { createPlanStore, PlanStore } from ".";
import { useStore } from "zustand";

export type PlanStoreApi = ReturnType<typeof createPlanStore>;
export const PlanStoreContext = createContext<PlanStoreApi | null>(null);

export const usePlanStore = <T>(selector: (store: PlanStore) => T): T => {
  const storeContext = useContext(PlanStoreContext);
  if (!storeContext) {
    throw new Error("usePlanStore must be used within a PlanStoreProvider");
  }
  return useStore(storeContext, selector);
};
