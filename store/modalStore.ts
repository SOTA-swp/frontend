import { ReactNode } from "react";
import { StateCreator } from "zustand";

export interface ModalStoreState {
  isModalOpen: boolean;
  modalPayloadQueue: { content: ReactNode; closeCallback?: () => void }[];
}

export interface ModalStoreActions {
  openModal: (content: ReactNode, closeCallback?: () => void) => void;
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
    openModal: (content, closeCallback) => {
      document.body.style.overflow = "hidden";
      set((state) => ({
        isModalOpen: true,
        modalPayloadQueue: [
          ...state.modalPayloadQueue,
          { content, closeCallback },
        ],
      }));
    },
    closeModal: () => {
      document.body.style.overflow = "";
      set((state) => {
        const { modalPayloadQueue } = state;
        if (modalPayloadQueue.length > 0) {
          const currentModal = modalPayloadQueue[0];
          currentModal.closeCallback?.();
        }
        return { isModalOpen: false };
      });
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
