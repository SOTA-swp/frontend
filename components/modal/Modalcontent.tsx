import { motion } from "motion/react";
import IconButton from "../IconButton";
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
    <motion.div className="relative flex flex-col justify-between max-w-200 min-w-175 max-h-125 min-h-100 bg-paper rounded-lg shadow-2xl">
      <IconButton
        onClick={closeModal}
        icon={<MdClose />}
        className="absolute top-4 right-4"
        variant={"iconOnly"}
        color={"gray"}
        style={{ zIndex: LAYER.MODAL + 1 }}
      />
      {children}
    </motion.div>
  );
}
