import { Plan } from "@/types/plan";
import { ReactNode } from "react";
import PlanStoreProvider from "../_store/PlanStoreProvider";
import { getPlan } from "../actions";
import Modal from "@/components/modal/Modal";

interface PlanLayoutProps {
  children: ReactNode;
  params: Promise<{ planId: Plan["id"] }>;
}

async function PlanLayout({ children, params }: PlanLayoutProps) {
  const { planId } = await params;
  const planData = await getPlan(planId);

  return (
    <PlanStoreProvider initData={planData}>
      <main>{children}</main>
      <Modal />
    </PlanStoreProvider>
  );
}

export default PlanLayout;
