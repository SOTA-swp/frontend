"use client";
import { PlanWithDetails } from "@/types/plan";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import { MdAirplanemodeActive, MdFavorite } from "react-icons/md";
import AddButton from "@/components/AddButton";
import PlanCard from "@/app/(main)/_components/PlanCard";
import { motion } from "motion/react";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import { use, useRef } from "react";
import MainViewController from "./MainViewController";
import PlanBlock from "./PlanBlock";
import { User } from "@/types/user";
import { useAppStore } from "@/store/AppStoreProvider";
import AddPlanModal from "./AddPlanModal";

export interface PlanViewProps {
  viewId: (typeof MAIN_PAGE_IDs)["PLANS"] | (typeof MAIN_PAGE_IDs)["FAVORITES"];
  plans: Promise<PlanWithDetails[] | null>;
  userId: User["id"];
}

function PlanView({ viewId, plans, userId }: PlanViewProps) {
  const ref = useRef<HTMLElement>(null);
  const openModal = useAppStore((state) => state.openModal);
  const user = useAppStore((state) => state.user);
  const resolvedPlans = use(plans);

  const isMe = user?.id === userId || userId === "me";

  const handleOpenAddPlanModal = () => {
    openModal(<AddPlanModal />);
  };

  if (!resolvedPlans) {
    return null;
  }

  return (
    <motion.section
      ref={ref}
      id={viewId}
      className="mt-16"
      style={{ scrollMarginTop: VIEW_TOP_MARGIN }}>
      <MainViewController
        ref={ref}
        viewId={viewId}
        rootMargin="-20% 0px -90% 0px"
      />
      <PlanBlock
        title={
          viewId === MAIN_PAGE_IDs.PLANS ? "作成した計画" : "お気に入りの計画"
        }
        icon={
          viewId === MAIN_PAGE_IDs.PLANS ? (
            <MdAirplanemodeActive />
          ) : (
            <MdFavorite />
          )
        }>
        {viewId === MAIN_PAGE_IDs.PLANS && isMe && user && (
          <AddButton onClick={handleOpenAddPlanModal} className="aspect-video">
            新規作成
          </AddButton>
        )}
        {resolvedPlans.map((plan) => (
          <PlanCard key={plan.planData.id} data={plan} layoutId={viewId} />
        ))}
      </PlanBlock>
    </motion.section>
  );
}

export default PlanView;
