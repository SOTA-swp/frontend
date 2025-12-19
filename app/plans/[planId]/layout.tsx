import PlanType from "@/types/plan";
import { ReactNode } from "react";
import PlanStoreProvider from "../_store/PlanStoreProvider";

interface PlanLayoutProps {
  children: ReactNode;
  params: { planId: Promise<PlanType["id"]> };
}

async function PlanLayout({ children, params }: PlanLayoutProps) {
  const { planId } = await params;

  return (
    <>
      <PlanStoreProvider>
        <main>{children}</main>
      </PlanStoreProvider>
    </>
  );
}

export default PlanLayout;
