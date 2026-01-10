"use client";

import CommonButton from "@/components/CommonButton";
import { MdAccessTime } from "react-icons/md";
import { usePlanStore } from "../../_store/hook";
import { toast } from "sonner";

function TimeRecalcButton() {
  const recalculateSchedule = usePlanStore(
    (state) => state.recalculateSchedule
  );
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  const handleRecalculate = () => {
    if (isReadOnly) return;
    recalculateSchedule();
    toast.success("スケジュール時間を自動調整しました");
  };

  if (isReadOnly) return null;

  return (
    <CommonButton
      variant="outline"
      size="sm"
      color="primary"
      onClick={handleRecalculate}
      icon={<MdAccessTime />}
    >
      時間を自動調整
    </CommonButton>
  );
}

export default TimeRecalcButton;
