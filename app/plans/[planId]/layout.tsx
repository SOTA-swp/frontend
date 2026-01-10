import { Plan } from "@/types/plan";
import { ReactNode } from "react";
import PlanStoreProvider from "../_store/PlanStoreProvider";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { PlanInfo } from "../_store/planInfoStore";

async function getPlanInfo(planId: Plan["id"]): Promise<PlanInfo> {
  try {
    const res = await fetchWrapper.get(ApiRoutes.plan.edit(planId), true, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch plan info");
    }
    const data: PlanInfo = await res.json();
    return data;
  } catch (e) {
    throw new Error(
      "Failed to fetch plan info" + (e instanceof Error ? e.message : "")
    );
  }
}

interface PlanLayoutProps {
  children: ReactNode;
  params: Promise<{ planId: Plan["id"] }>;
}

async function PlanLayout({ children, params }: PlanLayoutProps) {
  const { planId } = await params;

  const planInfo = await getPlanInfo(planId);

  // TODO: ロード中にスケルトンを出したい
  return (
    <>
      <PlanStoreProvider initData={{ planInfo }}>
        <main>{children}</main>
      </PlanStoreProvider>
    </>
  );
}

export default PlanLayout;
