import React from "react";
import { motion } from "motion/react";
import IconButton from "./IconButton";
import LAYER from "@/consts/LAYER";
import { MdClose } from "react-icons/md";

type ModalContentProps = {
  closeModal?: () => void;
  children?: React.ReactNode;
};

export default function ModalContent({
  closeModal,
  children,
}: ModalContentProps) {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200, transition: { damping: 400 } }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative flex flex-col justify-between max-w-[800px] min-w-[700px] max-h-[500px] min-h-[400px] bg-paper rounded-lg shadow-2xl"
    >
      <IconButton
        onClick={closeModal}
        icon={<MdClose />}
        className="absolute top-4 right-4"
        variant={"iconOnly"}
        style={{ zIndex: LAYER.MODAL + 1 }}
      />
      {children}
    </motion.div>
  );
}
