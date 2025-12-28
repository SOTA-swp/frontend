"use server";

import { createMockPlan, PlanWithDetails } from "@/types/plan";
import User, { createMockUser } from "@/types/user";
import { PLAN_LIMIT } from "./_consts/PLAN_LIMIT";

// TODO: 実際のAPIが完成したら置き換える
export async function getUserData(userId: string): Promise<
  User & {
    favoritesCount: number;
    favoredCount: number;
    createdCount: number;
  }
> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: userId,
    googleUserId: "??",
    name: `ユーザー${userId}`,
    email: `${userId}@mail.com`,
    picture: "/mock/img/user.png",
    createdAt: "2025-11-23T12:00:00.000Z",
    updatedAt: "2025-11-23T12:00:00.000Z",
    favoritesCount: 999,
    favoredCount: 999,
    createdCount: 999,
  };
}

// TODO: 実際のAPIが完成したら置き換える
export async function getPlans(
  q: string,
  page: number,
  limit: number = PLAN_LIMIT
): Promise<{ size: number; planData: PlanWithDetails[] }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    size: 100,
    planData: Array.from({ length: limit })
      .map((_, i) => ({
        planData: { favorites: 999, ...createMockPlan(i + 1 + page * limit) },
        creatorData: createMockUser(i + 1 + page * limit),
      }))
      .slice(0, Math.max(0, 100 - page * limit)),
  };
}
