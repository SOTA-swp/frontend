import { ReactNode } from "react";
import { StateCreator } from "zustand";

export interface ModalStoreState {
  isModalOpen: boolean;
  modalPayloadQueue: ReactNode[];
}

export interface ModalStoreActions {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  shiftModalQueue: () => void;
}

export type ModalStore = ModalStoreState & ModalStoreActions;

const defaultModalStore: ModalStoreState = {
  isModalOpen: false,
  modalPayloadQueue: [],
};

export const createModalStoreSlice: StateCreator<ModalStore> = (set) => {
  return {
    ...defaultModalStore,
    openModal: (content) => {
      document.body.style.overflow = "hidden";
      set((state) => ({
        isModalOpen: true,
        modalPayloadQueue: state.modalPayloadQueue
          ? [...state.modalPayloadQueue, content]
          : [content],
      }));
    },
    closeModal: () => {
      document.body.style.overflow = "";
      set({ isModalOpen: false });
    },
    shiftModalQueue: () => {
      set((state) => {
        const newOpen = state.modalPayloadQueue.length > 1;
        if (newOpen) document.body.style.overflow = "hidden";
        return {
          isModalOpen: newOpen,
          modalPayloadQueue: state.modalPayloadQueue.slice(1),
        };
      });
    },
  };
};
