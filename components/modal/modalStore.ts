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
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  payloadQueue: [],
  openModal: (content) => {
    set((state) => ({
      isOpen: true,
      payloadQueue: state.payloadQueue
        ? [...state.payloadQueue, content]
        : [content],
    }));
  },
  closeModal: () => {
    set((state) => ({
      isOpen: state.payloadQueue.length > 1,
      payloadQueue: state.payloadQueue.slice(1),
    }));
  },
}));
