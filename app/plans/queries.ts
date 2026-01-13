import { Plan } from "@/types/plan";
import { PlanInfo } from "./_store/planInfoStore";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";

/**
 * プラン情報を取得する関数(クライアントサイド)
 *
 * @param planId
 * @returns
 */
export async function getPlanInfo(planId: Plan["id"]): Promise<PlanInfo> {
  try {
    const res = await fetchWrapper.get(ApiRoutes.plan.edit(planId), false, {
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
