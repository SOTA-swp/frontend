import { create } from "zustand";

interface OpenPlanCardStore {
  openPlanCardId: string | null;
  setOpenPlanCardId: (planId: string | null) => void;
}

export const useOpenPlanCard = create<OpenPlanCardStore>((set) => ({
  openPlanCardId: null,
  setOpenPlanCardId: (planId) => set({ openPlanCardId: planId }),
}));
