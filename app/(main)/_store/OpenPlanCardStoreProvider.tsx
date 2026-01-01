"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  createOpenPlanCardStore,
  OpenPlanCardStore,
} from "./openPlanCardStore";
import { useStore } from "zustand";

export type OpenPlanCardStoreApi = ReturnType<typeof createOpenPlanCardStore>;

export const OpenPlanCardStoreContext =
  createContext<OpenPlanCardStoreApi | null>(null);

export interface OpenPlanCardStoreProviderProps {
  children: ReactNode;
}

export const OpenPlanCardStoreProvider = ({
  children,
}: OpenPlanCardStoreProviderProps) => {
  const [store] = useState(() => createOpenPlanCardStore());

  return (
    <OpenPlanCardStoreContext.Provider value={store}>
      {children}
    </OpenPlanCardStoreContext.Provider>
  );
};

export const useOpenPlanCardStore = <T,>(
  selector: (store: OpenPlanCardStore) => T
) => {
  const context = useContext(OpenPlanCardStoreContext);
  if (!context) {
    throw new Error(
      "useOpenPlanCardStore must be used within a OpenPlanCardStoreProvider"
    );
  }
  return useStore(context, selector);
};
