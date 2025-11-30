import { create } from "zustand";

export const SIDE_VIEWS = {
  USER: "user",
  PLANS: "plans",
  FAVORITES: "favorites",
  SEARCH: "search",
} as const;

export type SIDE_VIEWS_TYPE = (typeof SIDE_VIEWS)[keyof typeof SIDE_VIEWS];

interface SideStore {
  currentView: SIDE_VIEWS_TYPE | null;
  setCurrentView: (view: SIDE_VIEWS_TYPE) => void;
}

export const useSideStore = create<SideStore>((set) => ({
  currentView: null,
  setCurrentView: (view: SIDE_VIEWS_TYPE) => set({ currentView: view }),
}));
