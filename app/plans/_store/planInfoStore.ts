import { Plan } from "@/types/plan";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";
import { VIEW_MODE, ViewMode } from "../_consts/viewMode";

export type PlanInfo = Pick<
  Plan,
  "id" | "title" | "description" | "isPublic" | "creatorId"
>;

export interface PlanStoreState {
  planInfo: PlanInfo;
  viewMode: ViewMode;
}

export interface PlanActions {
  setPlanInfo: (planInfo: Partial<Plan>) => void;
  updatePlanInfo: (
    updatedFields: Partial<Plan> | Promise<Partial<Plan>>
  ) => void;

  setViewMode: (viewMode: ViewMode) => void;
}

export type PlanInfoStore = PlanStoreState & PlanActions;

export const defaultStore: PlanStoreState = {
  planInfo: {
    id: "",
    title: "",
    description: "",
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
    if (updatedFields instanceof Promise) {
      updatedFields.then((fields) => {
        set((state) => {
          if (isReadOnly(state)) return state;
          return {
            ...state,
            planInfo: { ...state.planInfo, ...fields },
          };
        });
      });
      return;
    }
    set((state) => {
      if (isReadOnly(state)) return state;
      return {
        ...state,
        planInfo: { ...state.planInfo, ...updatedFields },
      };
    });
  },

  setViewMode: (viewMode) => {
    set({ viewMode });
  },
});
