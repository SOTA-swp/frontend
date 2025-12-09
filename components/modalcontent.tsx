import { on } from "events";
import React from "react";
import { motion } from "motion/react";
import IconButton from "./IconButton";
import clsx from "clsx";
import LAYER from "@/consts/LAYER";
import { MdClose } from "react-icons/md";
import { ModalPayload } from "./modal/modalStore";


type ModalContentProps = ModalPayload &{
    closeModal?: () => void;
}


export default function ModalContent({
    modalType = "default",
    title = null,
    content = null,
    actions = [],
    closeModal,
}: ModalContentProps) {
    return (
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
    )
}


