"use client";
import Popover from "@/components/popover/Popover";

type NotifiactionProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

export default function Notification({
  open,
  anchorEl,
  handleClose,
}: NotifiactionProps) {
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom"
      >
        {/* 中身は空 */}
        <div style={{ width: 280, height: 100 }} />
      </Popover>
    </>
  );
}
