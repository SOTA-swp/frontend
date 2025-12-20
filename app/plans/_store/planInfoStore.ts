import PlanType from "@/types/plan";
import { StateCreator } from "zustand";

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

export const createPlanInfoSlice: StateCreator<PlanInfoStore> = (set) => ({
  ...defaultPlanInfoStore,
  setPlanInfo: (planInfo) => {
    set({ ...planInfo });
  },
  updatePlanInfo: (updatedFields) => {
    set((state) => ({
      ...state,
      ...updatedFields,
    }));
  },
});
