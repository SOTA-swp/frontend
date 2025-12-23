import { ReactNode } from "react";
import { create } from "zustand";

export interface ModalState {
  isOpen: boolean;
  payloadQueue: ReactNode[];
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  shiftQueue: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  payloadQueue: [],
  openModal: (content) => {
    document.body.style.overflow = "hidden";
    set((state) => ({
      isOpen: true,
      payloadQueue: state.payloadQueue
        ? [...state.payloadQueue, content]
        : [content],
    }));
  },
  closeModal: () => {
    document.body.style.overflow = "";
    set({ isOpen: false });
  },
  shiftQueue: () => {
    set((state) => {
      const newOpen = state.payloadQueue.length > 1;
      if (newOpen) document.body.style.overflow = "hidden";
      return {
        isOpen: newOpen,
        payloadQueue: state.payloadQueue.slice(1),
      };
    });
  },
}));
