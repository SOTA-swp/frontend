import { useAppStore } from "@/store/AppStoreProvider";
import AddPlanModal from "../_components/AddPlanModal";

export const useAddPlanModal = () => {
  const openModal = useAppStore((state) => state.openModal);
  const handleOpenAddPlanModal = () => {
    openModal(<AddPlanModal />);
  };

  return { handleOpenAddPlanModal };
};
