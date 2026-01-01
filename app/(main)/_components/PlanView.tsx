"use client";
import { PlanWithDetails } from "@/types/plan";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import { MdAirplanemodeActive, MdFavorite } from "react-icons/md";
import AddButton from "@/components/AddButton";
import PlanCard from "@/components/PlanCard";
import { motion } from "motion/react";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import { useRef } from "react";
import MainViewController from "./MainViewController";
import PlanBlock from "./PlanBlock";
import { useOpenPlanCardStore } from "../_store/OpenPlanCardStoreProvider";

export interface PlanViewProps {
  viewId: (typeof MAIN_PAGE_IDs)["PLANS"] | (typeof MAIN_PAGE_IDs)["FAVORITES"];
  plans: PlanWithDetails[];
}

function PlanView({ viewId, plans }: PlanViewProps) {
  const openPlanCardId = useOpenPlanCardStore((state) => state.openPlanCardId);
  const setOpenPlanCardId = useOpenPlanCardStore(
    (state) => state.setOpenPlanCardId
  );
  const ref = useRef<HTMLElement>(null);

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
        {viewId === MAIN_PAGE_IDs.PLANS && (
          <AddButton className="aspect-video">新規作成</AddButton>
        )}
        {plans.map((plan) => {
          const wrapId = `${viewId}-${plan.planData.id}`;
          const handleOpen = () => setOpenPlanCardId(wrapId);
          const handleClose = () => setOpenPlanCardId(null);
          return (
            <PlanCard
              key={plan.planData.id}
              data={plan}
              layoutId={viewId}
              onOpen={handleOpen}
              onClose={handleClose}
              open={openPlanCardId === wrapId}
            />
          );
        })}
      </PlanBlock>
    </motion.section>
  );
}

export default PlanView;
