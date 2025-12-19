import PlanType from "@/types/plan";
import { ReactNode } from "react";
import PlanStoreProvider from "../_store/PlanStoreProvider";
import { getPlan } from "../actions";

interface PlanLayoutProps {
  children: ReactNode;
  params: { planId: Promise<PlanType["id"]> };
}

async function PlanLayout({ children, params }: PlanLayoutProps) {
  const { planId } = await params;

  const planData = await getPlan(await planId);

  // TODO: ロード中にスケルトンを出したい
  return (
    <>
      <PlanStoreProvider initData={planData}>
        <main>{children}</main>
      </PlanStoreProvider>
    </>
  );
}

export default PlanLayout;
