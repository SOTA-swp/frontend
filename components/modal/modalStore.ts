import { create } from "zustand";

export interface ModalPayload {
  modalType: "default" | "error";
  title: React.ReactNode;
  content: React.ReactNode;
  actions: React.ReactNode[];
}

export interface ModalState {
  isOpen: boolean;
  payloadQueue: ModalPayload[];
  openModal: (content: ModalPayload) => void;
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
      document.body.style.overflow = "hidden";
      return {
        isOpen: newOpen,
        payloadQueue: state.payloadQueue.slice(1),
      };
    });
  },
}));
