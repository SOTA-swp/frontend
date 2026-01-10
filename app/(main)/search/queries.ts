import { PlanWithDetails } from "@/types/plan";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { Pagination } from "./_types/pagination";
import { formatPlanData } from "../_util/formatPlanData";
import { SEARCH_LIMIT } from "../_consts/PLAN_LIMIT";

export const searchPlans = async (
  q: string,
  page: number,
  sort: "popular" | "new" = "popular",
  limit: number = SEARCH_LIMIT
): Promise<{
  plans: PlanWithDetails[];
  pagination: Pagination;
}> => {
  const isSever = typeof window === "undefined";

  const params = new URLSearchParams({
    q,
    page: page.toString(),
    limit: limit.toString(),
    sort,
  }).toString();
  const res = await fetchWrapper.get(
    `${ApiRoutes.plan.create}?${params}`,
    isSever,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch plan info");
  }
  const data = await res.json();
  const { plans, pagination } = data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPlans = plans.map((plan: any) => formatPlanData(plan));
  const planData = await Promise.all(formatPlans);
  console.log(planData);
  return { plans: planData, pagination };
};
