import { create } from "zustand";
import { createNodeSlice, NodeStore } from "./nodeStore";
import { createLocationSlice, LocationStore } from "./locationStore";

export type PlanStore = NodeStore & LocationStore;

export const createPlanStore = (initData?: Partial<PlanStore>) => {
  return create<PlanStore>((...a) => ({
    ...createNodeSlice(...a),
    ...createLocationSlice(...a),
    ...initData,
  }));
};
