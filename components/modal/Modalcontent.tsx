import IconButton from "../IconButton";
import LAYER from "@/consts/LAYER";
import { MdClose } from "react-icons/md";
import { ComponentPropsWithoutRef, ElementType } from "react";

type ModalContentProps<T extends ElementType = "div"> = {
  closeModal?: () => void;
  children?: React.ReactNode;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export default function ModalContent<T extends ElementType>({
  closeModal,
  children,
  as,
  ...props
}: ModalContentProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className="relative flex flex-col max-w-200 min-w-175 max-h-125 min-h-100 bg-paper rounded-lg shadow-2xl"
      {...props}>
      <IconButton
        onClick={closeModal}
        icon={<MdClose />}
        className="absolute top-4 right-4"
        variant={"iconOnly"}
        color={"gray"}
        style={{ zIndex: LAYER.MODAL + 1 }}
      />
      {children}
    </Component>
  );
}
