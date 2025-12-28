"use server";

import Plan, { createMockPlan } from "@/types/plan";

export interface FetchPlansParams {
  planId?: string;
  userId?: string;
  isFavorite?: boolean;
  searchQuery?: string;
  page?: number;
  limit?: number;
  orderBy?: "createdAt" | "favoriteCount";
  orderDirection?: "asc" | "desc";
}

/**
 * 計画一覧を取得する共通関数
 */
export async function fetchPlans(params: FetchPlansParams): Promise<Plan[]> {
  const queryParams = new URLSearchParams();

  if (params.planId) queryParams.append("planId", params.planId);
  if (params.userId) queryParams.append("userId", params.userId);
  if (params.isFavorite) queryParams.append("favorite", "true");
  if (params.searchQuery) queryParams.append("q", params.searchQuery);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.orderBy) queryParams.append("orderBy", params.orderBy);
  if (params.orderDirection)
    queryParams.append("orderDirection", params.orderDirection);

  //   TODO:実際のAPIができたらコメントアウトを外す
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/plans?${queryParams}`,
  //     { cache: "no-store" }
  //   );

  //   if (!response.ok) throw new Error("Failed to fetch plans");
  //   const data = (await response.json()) as PlanType[];
  //   return data;

  // モックデータを返す（実際のAPI呼び出しはコメントアウト）
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: params.limit || 10 }, (_, i) =>
    createMockPlan(i)
  );
}

/**
 * 計画をIDで取得
 */
export async function fetchPlanById(planId: string) {
  const plans = await fetchPlans({ planId });
  const plan = plans.find((p) => p.id === planId);
  if (!plan) throw new Error("Plan not found");
  return plan;
}

/**
 * ユーザーの計画を取得
 */
export async function fetchUserPlans(userId: string) {
  return fetchPlans({ userId });
}

/**
 * お気に入りの計画を取得
 */
export async function fetchFavoritePlans(userId: string) {
  return fetchPlans({ userId, isFavorite: true });
}

/**
 * 計画を検索
 */
export async function searchPlans(query: string) {
  return fetchPlans({ searchQuery: query });
}

/**
 * 新しい計画を検索
 */
export async function searchNewPlans(query: string) {
  return fetchPlans({
    searchQuery: query,
    orderBy: "createdAt",
    orderDirection: "desc",
  });
}

/**
 * 人気の計画を検索
 */
export async function searchPopularPlans(query: string) {
  return fetchPlans({
    searchQuery: query,
    orderBy: "favoriteCount",
    orderDirection: "desc",
  });
}
