import { create } from "zustand";
import { AuthStore, createAuthStoreSlice } from "./authStore";

export type AppStore = AuthStore;

export const createAppStore = (initData?: Partial<AppStore>) => {
  return create<AppStore>((...a) => ({
    ...createAuthStoreSlice(...a),
    ...initData,
  }));
};
