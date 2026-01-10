import { create } from "zustand";
import { AuthStore, createAuthStoreSlice } from "./authStore";
import { createModalStoreSlice, ModalStore } from "./modalStore";
import { ThemeStore, createThemeStoreSlice } from "./themeStore";

export type AppStore = AuthStore & ModalStore & ThemeStore;

export const createAppStore = (initData?: Partial<AppStore>) => {
  return create<AppStore>((...a) => ({
    ...createAuthStoreSlice(...a),
    ...createModalStoreSlice(...a),
    ...createThemeStoreSlice(...a),
    ...initData,
  }));
};
