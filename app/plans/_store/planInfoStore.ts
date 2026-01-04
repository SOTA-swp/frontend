import { Plan } from "@/types/plan";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";
import { VIEW_MODE, ViewMode } from "../_consts/viewMode";

export interface PlanStoreState {
  planInfo: Plan;
  viewMode: ViewMode;
}

export interface PlanActions {
  setPlanInfo: (planInfo: Partial<Plan>) => void;
  updatePlanInfo: (updatedFields: Partial<Plan>) => void;

  setViewMode: (viewMode: ViewMode) => void;
}

export type PlanInfoStore = PlanStoreState & PlanActions;

export const defaultStore: PlanStoreState = {
  planInfo: {
    id: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    creatorId: "",
    isPublic: false,
  },
  viewMode: VIEW_MODE.TIMELINE,
};

const isReadOnly = (state: PlanInfoStore & PermissionStore) => state.isReadOnly;

export const createPlanInfoSlice: StateCreator<
  PlanInfoStore & PermissionStore,
  [],
  [],
  PlanInfoStore
> = (set) => ({
  ...defaultStore,

  setPlanInfo: (planInfo) => {
    set((state) => ({
      planInfo: { ...state.planInfo, ...planInfo },
    }));
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

  setViewMode: (viewMode) => {
    set({ viewMode });
  },
});
