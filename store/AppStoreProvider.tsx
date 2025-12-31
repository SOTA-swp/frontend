"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AppStore, createAppStore } from "./appStore";
import { useStore } from "zustand";

export type AppStoreApi = ReturnType<typeof createAppStore>;
export const AppStoreContext = createContext<AppStoreApi | null>(null);

export interface AppStoreProviderProps {
  children: React.ReactNode;
  initData?: Partial<AppStore>;
}

export const AppStoreProvider = ({
  children,
  initData,
}: AppStoreProviderProps) => {
  const [store] = useState(() => createAppStore(initData));
  const refetch = store.getState().refetch;
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }
  return useStore(context, selector);
};
