import { Plan } from "@/types/plan";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";

export type PlanInfoStoreState = Plan;

export interface PlanInfoActions {
  setPlanInfo: (planInfo: Partial<Plan>) => void;
  updatePlanInfo: (updatedFields: Partial<Plan>) => void;
}

export type PlanInfoStore = PlanInfoStoreState & PlanInfoActions;

export const defaultPlanInfoStore: PlanInfoStoreState = {
  id: "",
  title: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  creatorId: "",
  isPublic: false,
};

const isReadOnly = (state: PlanInfoStore & PermissionStore) => state.isReadOnly;

export const createPlanInfoSlice: StateCreator<
  PlanInfoStore & PermissionStore,
  [],
  [],
  PlanInfoStore
> = (set) => ({
  ...defaultPlanInfoStore,
  setPlanInfo: (planInfo) => {
    set({ ...planInfo });
  },
  updatePlanInfo: (updatedFields) => {
    set((state) => {
      if (isReadOnly(state)) return state;
      return {
        ...state,
        ...updatedFields,
      };
    });
  },
});
