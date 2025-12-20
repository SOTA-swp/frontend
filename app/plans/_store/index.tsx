import { create } from "zustand";
import { createNodeSlice, NodeStore } from "./nodeStore";
import { createLocationSlice, LocationStore } from "./locationStore";
import { createPlanInfoSlice, PlanInfoStore } from "./planInfoStore";

export type PlanStore = NodeStore & LocationStore & PlanInfoStore;

export const createPlanStore = (initData?: Partial<PlanStore>) => {
  return create<PlanStore>((...a) => ({
    ...createNodeSlice(...a),
    ...createLocationSlice(...a),
    ...createPlanInfoSlice(...a),
    ...initData,
  }));
};
