import { useAppStore } from "@/store/AppStoreProvider";
import EditPlanInfoModal from "../_components/EditPlanInfoModal";
import { usePlanStore } from "../_store/hook";
import { getPlanInfo } from "../queries";
import { EditPlanFormData } from "../_types/EditPlanFormData";

export const useEditPlanInfoModal = () => {
  const planId = usePlanStore((state) => state.planInfo.id);
  const updatePlanInfo = usePlanStore((state) => state.updatePlanInfo);
  const openModal = useAppStore((state) => state.openModal);

  const onEdit = (data: EditPlanFormData) => {
    updatePlanInfo(data);
  };

  const handleOpenEditPlanInfoModal = async () => {
    const planInfo = getPlanInfo(planId);
    updatePlanInfo(planInfo);
    openModal(
      <EditPlanInfoModal planId={planId} planData={planInfo} onEdit={onEdit} />
    );
  };

  return { handleOpenEditPlanInfoModal };
};
