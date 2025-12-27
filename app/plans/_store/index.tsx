import { create } from "zustand";
import { createNodeSlice, NodeStore } from "./nodeStore";
import { createLocationSlice, LocationStore } from "./locationStore";
import { createPlanInfoSlice, PlanInfoStore } from "./planInfoStore";
import { createPermissionSlice, PermissionStore } from "./permissionStore";

export type PlanStore = NodeStore &
  LocationStore &
  PlanInfoStore &
  PermissionStore;

export const createPlanStore = (initData?: Partial<PlanStore>) => {
  return create<PlanStore>((...a) => ({
    ...createPermissionSlice(...a),
    ...createNodeSlice(...a),
    ...createLocationSlice(...a),
    ...createPlanInfoSlice(...a),
    ...initData,
  }));
};
