import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { StateCreator } from "zustand";

export interface YjsState {
  ydoc: Y.Doc | null;
  provider: WebsocketProvider | null;
  connectionStatus: string;
}

export interface YjsActions {
  setYdoc: (ydoc: Y.Doc | null) => void;
  setProvider: (provider: WebsocketProvider | null) => void;
  setConnectionStatus: (status: string) => void;
}

export type YjsStore = YjsState & YjsActions;

export const defaultYjsStore: YjsState = {
  ydoc: null,
  provider: null,
  connectionStatus: "disconnected",
};

export const createYjsSlice: StateCreator<YjsStore, [], [], YjsStore> = (
  set
) => ({
  ...defaultYjsStore,
  setYdoc: (ydoc) => set({ ydoc }),
  setProvider: (provider) => set({ provider }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
});
