"use server";

import { createMockPlan, PlanWithDetails } from "@/types/plan";
import { createMockUser, User } from "@/types/user";
import { PLAN_LIMIT } from "./_consts/PLAN_LIMIT";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { cookies } from "next/headers";
import { AddPlanFormData, AddPlanFormSchema, EditUserFormData } from "./_types";
import { revalidatePath } from "next/cache";
import { PLAN_ROLE } from "../plans/_consts/planRole";

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
    username: `ユーザー${userId}`,
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
        planData: {
          favorites: 999,
          hasLiked: false,
          role: PLAN_ROLE.OWNER,
          ...createMockPlan(i + 1 + page * limit),
        },
        creatorData: createMockUser(i + 1 + page * limit),
      }))
      .slice(0, Math.max(0, 100 - page * limit)),
  };
}

interface CreatePlanResult {
  ok: boolean;
  newPlan: { id: string } | null;
  message: string;
}
export async function createPlan(
  data: AddPlanFormData
): Promise<CreatePlanResult> {
  const failedMessage = (message: string) =>
    `計画の作成に失敗しました: ${message}`;
  const successMessage = "計画を作成しました";

  try {
    const result = AddPlanFormSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        newPlan: null,
        message: failedMessage(result.error.message),
      };
    }
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.post(ApiRoutes.plan.create, data, true, {
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });

    const ok = res.ok;
    const newPlan = await res.json();
    const message = ok
      ? successMessage
      : failedMessage(res.statusText || "不明なエラー");
    return { ok, newPlan, message };
  } catch (e) {
    return { ok: false, newPlan: null, message: failedMessage(String(e)) };
  }
}

// TODO: APIの定義がされたらちゃんと実装する
interface EditPlanResult {
  ok: boolean;
  message: string;
}
export async function editPlan(
  planId: string,
  data: Partial<AddPlanFormData>
): Promise<EditPlanResult> {
  const failedMessage = (message: string) =>
    `計画の編集に失敗しました: ${message}`;
  const successMessage = "計画を編集しました";
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.put(
      ApiRoutes.plan.edit(planId),
      data,
      true,
      {
        credentials: "include",
        headers: {
          Cookie: cookie,
        },
      }
    );
    const ok = res.ok;
    const message = ok
      ? successMessage
      : failedMessage(res.statusText || "不明なエラー");
    return { ok, message };
  } catch (_) {
    return { ok: false, message: failedMessage("不明なエラー") };
  }
}

interface EditUserResult {
  ok: boolean;
  message: string;
}
export async function editUser(
  data: EditUserFormData,
  path: string
): Promise<EditUserResult> {
  const failedMessage = (message: string) =>
    `ユーザー情報の編集に失敗しました: ${message}`;
  const successMessage = "ユーザー情報を編集しました";
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.put(ApiRoutes.auth.me, data, true, {
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });
    const ok = res.ok;
    const message = ok
      ? successMessage
      : failedMessage(res.statusText || "不明なエラー");

    if (ok) {
      revalidatePath(path);
    }

    return { ok, message };
  } catch (e) {
    return { ok: false, message: failedMessage(String(e)) };
  }
}
