import { useAppStore } from "@/store/AppStoreProvider";
import AddPlanModal from "../_components/AddPlanModal";

export const useAddPlanModal = () => {
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const handleOpenAddPlanModal = () => {
    openModal(<AddPlanModal closeModal={closeModal} />);
  };

  return { handleOpenAddPlanModal };
};
