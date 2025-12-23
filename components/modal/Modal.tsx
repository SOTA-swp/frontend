"use client";
import { ModalPayload, useModalStore } from "./modalStore";
import { AnimatePresence, motion } from "motion/react";
import LAYER from "@/consts/LAYER";
import ModalContent from "./ModalContent";

function Modal() {
  const { isOpen, payloadQueue, closeModal, shiftQueue } = useModalStore();
  const modalPayload: ModalPayload =
    payloadQueue.length === 0
      ? { modalType: "default", title: null, content: null, actions: [] }
      : payloadQueue[0];

  return (
    <AnimatePresence onExitComplete={shiftQueue}>
      {isOpen && (
        // バックドロップ
        <motion.div
          onClick={closeModal}
          initial={{ backdropFilter: "blur(0px) brightness(1)" }}
          animate={{ backdropFilter: "blur(4px) brightness(0.9)" }}
          exit={{ backdropFilter: "blur(0px) brightness(1)" }}
          className="fixed inset-0 flex items-center justify-center "
          style={{ zIndex: LAYER.MODAL }}
        >
          {/* 本体はmodalcontentに切り出し */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200, transition: { damping: 400 } }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <ModalContent {...modalPayload} closeModal={closeModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
