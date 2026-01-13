import { createStore } from "zustand";

export interface OpenPlanCardStoreState {
  openPlanCardId: string | null;
}

export interface OpenPlanCardStoreActions {
  setOpenPlanCardId: (planId: string | null) => void;
}

export type OpenPlanCardStore = OpenPlanCardStoreState & OpenPlanCardStoreActions;

const defaultOpenPlanCardStore: OpenPlanCardStoreState = {
  openPlanCardId: null,
};

export const createOpenPlanCardStore = (
  initState: OpenPlanCardStoreState = defaultOpenPlanCardStore
) => {
  return createStore<OpenPlanCardStore>((set) => ({
    ...initState,
    setOpenPlanCardId: (planId: string | null) => {
      set({ openPlanCardId: planId });
    },
  }));
};
