"use client";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import Popover from "@/components/popover/Popover";
import { Suspense } from "react";
import NotificationList from "./NotificationList";
import ModalAction from "@/components/modal/ModalAction";
import CommonButton from "@/components/CommonButton";

interface NotificationPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

export default function NotificationPopover({
  open,
  anchorEl,
  handleClose,
}: NotificationPopoverProps) {
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-start"
        flipEnabled={false}>
        <ModalContent closeModal={handleClose}>
          <ModalTitle>通知</ModalTitle>
          <Suspense fallback={<div>Loading...</div>}>
            <NotificationList />
          </Suspense>
          <ModalAction>
            <CommonButton onClick={handleClose} modal variant={"outline"}>
              閉じる
            </CommonButton>
          </ModalAction>
        </ModalContent>
      </Popover>
    </>
  );
}
