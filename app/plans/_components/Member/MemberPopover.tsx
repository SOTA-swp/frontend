"use client";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import Popover from "@/components/popover/Popover";
import InvitationForm from "./InvitationForm";
import { usePlanStore } from "../../_store/hook";
import MemberList from "./MemberList";
import { Suspense } from "react";

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
        <div className="flex flex-col px-6 gap-6">
          <InvitationForm planId={planId} />
          <Suspense fallback={<div>Loading...</div>}>
            <MemberList planId={planId} />
          </Suspense>
        </div>
      </ModalContent>
    </Popover>
  );
}

export default MemberPopover;
