"use client";
import Chip from "@/components/Chip";
import { usePlanStore } from "../_store/hook";
import IconButton from "@/components/IconButton";
import { MdEdit } from "react-icons/md";
import QuickMenu from "./QuickMenu";
import { useEditPlanInfoModal } from "../_hooks/useEditPlanInfoModal";

function PlanInfo() {
  const planTitle = usePlanStore((state) => state.planInfo.title);
  const planDescription = usePlanStore((state) => state.planInfo.description);
  const isPublic = usePlanStore((state) => state.planInfo.isPublic);
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  const { handleOpenEditPlanInfoModal } = useEditPlanInfoModal();

  return (
    <div className="my-3 py-2 pl-4 border-l-2 border-accent">
      <QuickMenu />
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-bold">{planTitle}</h2>
        <div className="flex gap-2 items-center mr-10">
          <Chip
            variant={"outline"}
            rounded
            color={isPublic ? "primary" : "gray"}
            size={"sm"}>
            ・{isPublic ? "公開中" : "非公開"}
          </Chip>
          {/* TODO: 編集モーダルを開く */}
          {!isReadOnly && (
            <IconButton
              onClick={handleOpenEditPlanInfoModal}
              title="編集する"
              variant={"iconOnly"}
              color={"gray"}
              icon={<MdEdit />}
            />
          )}
        </div>
      </div>
      <p
        className="mt-1 text-text-secondary text-sm text-muted-foreground whitespace-pre-wrap max-h-20 overflow-auto pb-5"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}>
        {planDescription}
      </p>
    </div>
  );
}

export default PlanInfo;
