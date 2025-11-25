"use client";
import PlanType from "@/types/plan";
import UserType from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import SectionTitle from "@/components/SectionTitle";
import { MdAirplanemodeActive, MdFavorite } from "react-icons/md";
import AddButton from "@/components/AddButton";
import PlanCard from "@/components/PlanCard";
import { motion } from "motion/react";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import { useRef } from "react";
import MainViewController from "./MainViewController";
import PlanBlock from "./PlanBlock";

export interface PlanViewProps {
  viewId: (typeof MAIN_PAGE_IDs)["PLANS"] | (typeof MAIN_PAGE_IDs)["FAVORITES"];
  plans: {
    planData: PlanType & { favorites: number };
    userData: UserType;
  }[];
}

function PlanView({ viewId, plans }: PlanViewProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={ref}
      id={viewId}
      className="mt-16 min-h-[500px]"
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
        {plans.map((plan) => (
          <PlanCard
            key={plan.planData.id}
            planData={plan.planData}
            userData={plan.userData}
          />
        ))}
      </PlanBlock>
    </motion.section>
  );
}

export default PlanView;
