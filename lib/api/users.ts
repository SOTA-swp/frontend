"use server";

import UserType, { createMockUser } from "@/types/user";

export interface FetchUsersParams {
  userId?: string;
  planId?: string;
}

/**
 * ユーザーを取得する共通関数
 */
export async function fetchUsers(
  params: FetchUsersParams
): Promise<UserType[]> {
  const queryParams = new URLSearchParams();

  if (params.userId) queryParams.append("userId", params.userId);
  if (params.planId) queryParams.append("planId", params.planId);

  //   TODO:実際のAPIができたらコメントアウトを外す
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/users?${queryParams}`,
  //     { cache: "no-store" }
  //   );

  //   if (!response.ok) throw new Error("Failed to fetch users");
  //   const data = (await response.json()) as UserType[];
  //   return data;

  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: 5 }, (_, i) => createMockUser(i));
}

/**
 * ユーザーをIDで取得
 */
export async function fetchUserById(userId: string) {
  const users = await fetchUsers({ userId });
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  return users;
}

/**
 * 計画に参加しているユーザー一覧を取得
 */
export async function fetchUsersByPlanId(planId: string) {
  const users = await fetchUsers({ planId });
  return users;
}
