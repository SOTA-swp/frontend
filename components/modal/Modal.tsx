"use client";
import { AnimatePresence, motion } from "motion/react";
import LAYER from "@/consts/LAYER";
import { useAppStore } from "@/store/AppStoreProvider";

function Modal() {
  const open = useAppStore((state) => state.isModalOpen);
  const payloadQueue = useAppStore((state) => state.modalPayloadQueue);
  const closeModal = useAppStore((state) => state.closeModal);
  const shiftQueue = useAppStore((state) => state.shiftModalQueue);
  const modalPayload = payloadQueue.length === 0 ? null : payloadQueue[0];

  return (
    <AnimatePresence onExitComplete={shiftQueue}>
      {open && (
        // バックドロップ
        <motion.div
          onClick={closeModal}
          initial={{ backdropFilter: "blur(0px) brightness(1)" }}
          animate={{ backdropFilter: "blur(4px) brightness(0.9)" }}
          exit={{ backdropFilter: "blur(0px) brightness(1)" }}
          className="fixed inset-0 flex items-center justify-center "
          style={{ zIndex: LAYER.MODAL }}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200, transition: { damping: 400 } }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}>
            {modalPayload?.content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
