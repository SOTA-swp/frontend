import { create } from "zustand";
import { AuthStore, createAuthStoreSlice } from "./authStore";
import { createModalStoreSlice, ModalStore } from "./modalStore";

export type AppStore = AuthStore & ModalStore;

export const createAppStore = (initData?: Partial<AppStore>) => {
  return create<AppStore>((...a) => ({
    ...createAuthStoreSlice(...a),
    ...createModalStoreSlice(...a),
    ...initData,
  }));
};
