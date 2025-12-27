import PlanType from "@/types/plan";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";

export type PlanInfoStoreState = PlanType;

export interface PlanInfoActions {
  setPlanInfo: (planInfo: Partial<PlanType>) => void;
  updatePlanInfo: (updatedFields: Partial<PlanType>) => void;
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
