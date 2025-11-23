"use client";
import PlanType from "@/types/plan";
import UserType from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";

export interface PlanViewProps {
  viewId: (typeof MAIN_PAGE_IDs)["PLANS"] | (typeof MAIN_PAGE_IDs)["FAVORITES"];
  plans: (PlanType & { userData: UserType; favoriteCount: number })[];
}

function PlanView({ viewId, plans }: PlanViewProps) {
  return (
    <section id={viewId} className="h-dvh">
      PlanView
    </section>
  );
}

export default PlanView;
