"use client";
import { useModalStore } from "./modalStore";
import { AnimatePresence, motion } from "motion/react";
import LAYER from "@/consts/LAYER";
import clsx from "clsx";
import IconButton from "../IconButton";
import { MdClose } from "react-icons/md";

function Modal() {
  const { isOpen, payloadQueue, closeModal, shiftQueue } = useModalStore();
  const { modalType, title, content, actions } =
    payloadQueue.length === 0
      ? { title: null, content: null, actions: [] }
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
          style={{ zIndex: LAYER.MODAL }}>
          {/* モーダル本体 */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200, transition: { damping: 400 } }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative flex flex-col justify-between max-w-[800px] min-w-[700px] max-h-[500px] min-h-[400px] bg-paper rounded-lg shadow-2xl">
            <IconButton
              onClick={closeModal}
              icon={<MdClose />}
              className="absolute top-4 right-4"
              variant={"iconOnly"}
              style={{ zIndex: LAYER.MODAL + 1 }}
            />
            <div className="p-6 flex flex-col gap-4">
              <h2
                className={clsx(
                  "text-2xl font-bold",
                  modalType === "default" && "text-primary",
                  modalType === "error" && "text-error"
                )}>
                {title}
              </h2>
              <div>{content}</div>
            </div>
            {actions.length > 0 && (
              <div className="flex justify-end">
                <div className="flex justify-end gap-4 p-4 border-t border-l rounded-tl-lg border-border">
                  {actions.map((action, i) => (
                    <div key={i} className="flex min-w-[150px] justify-stretch">
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
