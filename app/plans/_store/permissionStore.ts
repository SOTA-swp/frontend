import { StateCreator } from "zustand";

export interface PermissionState {
  isReadOnly: boolean;
}

export interface PermissionActions {
  setReadOnly: (readOnly: boolean) => void;
}

export type PermissionStore = PermissionState & PermissionActions;

export const defaultPermissionStore: PermissionState = {
  isReadOnly: false,
};

export const createPermissionSlice: StateCreator<PermissionStore> = (set) => ({
  ...defaultPermissionStore,
  setReadOnly: (readOnly) => set({ isReadOnly: readOnly }),
});
