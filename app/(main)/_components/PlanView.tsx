"use client";
import PlanType from "@/types/plan";
import UserType from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import SectionTitle from "@/components/SectionTitle";
import { MdAirplanemodeActive, MdFavorite } from "react-icons/md";
import AddButton from "@/components/AddButton";
import PlanCard from "@/components/PlanCard";
import { motion } from "motion/react";
import { useSideStore } from "./side/sideStore";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import { useEffect, useRef } from "react";

export interface PlanViewProps {
  viewId: (typeof MAIN_PAGE_IDs)["PLANS"] | (typeof MAIN_PAGE_IDs)["FAVORITES"];
  plans: {
    planData: PlanType & { favorites: number };
    userData: UserType;
  }[];
}

function PlanView({ viewId, plans }: PlanViewProps) {
  const { setCurrentView } = useSideStore();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentView(viewId);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -90% 0px",
        threshold: 0,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [viewId, setCurrentView]);

  return (
    <motion.section
      ref={ref}
      id={viewId}
      className="mt-16 min-h-[500px]"
      style={{ scrollMarginTop: VIEW_TOP_MARGIN }}>
      <SectionTitle
        color="gray"
        icon={
          viewId === MAIN_PAGE_IDs.PLANS ? (
            <MdAirplanemodeActive />
          ) : (
            <MdFavorite />
          )
        }>
        {viewId === MAIN_PAGE_IDs.PLANS ? "作成した計画" : "お気に入りの計画"}
      </SectionTitle>
      <div className="grid  grid-cols-[repeat(auto-fill,minmax(330px,1fr))] mt-8 gap-4">
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
      </div>
    </motion.section>
  );
}

export default PlanView;
