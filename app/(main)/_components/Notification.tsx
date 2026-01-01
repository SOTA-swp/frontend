"use client";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import Popover from "@/components/popover/Popover";

type NotificationProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export default function Notification({
  open,
  anchorEl,
  handleClose,
}: NotificationProps) {
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-start"
        flipEnabled={false}>
        <ModalContent closeModal={handleClose}>
          <ModalTitle>通知一覧</ModalTitle>
        </ModalContent>
      </Popover>
    </>
  );
}
