"use client";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import Popover from "@/components/popover/Popover";
import InvitationForm from "./InvitationForm";
import { usePlanStore } from "../../_store/hook";

interface MemberPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

function MemberPopover({ handleClose, ...props }: MemberPopoverProps) {
  const planId = usePlanStore((state) => state.planInfo.id);

  return (
    <Popover {...props} onClose={handleClose}>
      <ModalContent closeModal={handleClose}>
        <ModalTitle>メンバー</ModalTitle>
        <div className="px-6">
          <InvitationForm planId={planId} />
        </div>
      </ModalContent>
    </Popover>
  );
}

export default MemberPopover;
