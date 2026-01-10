"use server";

import { createMockPlan, PlanWithDetails } from "@/types/plan";
import { createMockUser, User } from "@/types/user";
import { SEARCH_LIMIT } from "./_consts/PLAN_LIMIT";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { cookies } from "next/headers";
import {
  AddPlanFormData,
  AddPlanFormSchema,
  EditUserFormData,
  EditUserFormSchema,
} from "./_types";
import { revalidatePath } from "next/cache";
import { PLAN_ROLE } from "../../consts/PLAN_ROLE";
import { EditPlanFormSchema } from "../plans/_types/EditPlanFormData";
import { formatPlanData } from "./_util/formatPlanData";
import { Pagination } from "./search/_types/pagination";
import { SearchPageParams } from "./search/_types/searchParams";

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
  limit: number = SEARCH_LIMIT
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

interface EditPlanResult {
  ok: boolean;
  message: string;
}
export async function editPlan(
  planId: string,
  data: Partial<AddPlanFormData>,
  path?: string
): Promise<EditPlanResult> {
  const failedMessage = (message: string) =>
    `計画の編集に失敗しました: ${message}`;
  const successMessage = "計画を編集しました";
  try {
    const result = EditPlanFormSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        message: failedMessage(result.error.message),
      };
    }

    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.patch(
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

    if (ok && path) {
      revalidatePath(path);
    }

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
    const result = EditUserFormSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        message: failedMessage(result.error.message),
      };
    }

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

interface DeletePlanResult {
  ok: boolean;
  message: string;
}
export async function deletePlan(
  planId: string,
  path?: string
): Promise<DeletePlanResult> {
  const failedMessage = (message: string) =>
    `計画の削除に失敗しました: ${message}`;
  const successMessage = "計画を削除しました";
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.delete(ApiRoutes.plan.edit(planId), true, {
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });
    const ok = res.ok;
    const message = ok
      ? successMessage
      : failedMessage(res.statusText || "不明なエラー");
    if (ok && path) {
      revalidatePath(path);
    }
    return { ok, message };
  } catch (e) {
    return { ok: false, message: failedMessage(String(e)) };
  }
}

interface RespondToInvitationResult {
  ok: boolean;
  message: string;
}
export async function respondToInvitation(
  invitationId: string,
  accept: boolean,
  path?: string
): Promise<RespondToInvitationResult> {
  const failedMessage = (message: string) =>
    `招待への対応に失敗しました: ${message}`;
  const successMessage = accept ? "招待を承認しました" : "招待を拒否しました";
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.patch(
      ApiRoutes.invitation.respond(invitationId),
      { accept, invitationId },
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

    if (ok && path) {
      revalidatePath(path);
    }
    return { ok, message };
  } catch (e) {
    return { ok: false, message: failedMessage(String(e)) };
  }
}

interface MarkNotificationReadResult {
  ok: boolean;
  message: string;
}
export async function markNotificationRead(
  ids: string[]
): Promise<MarkNotificationReadResult> {
  const failedMessage = (message: string) =>
    `通知の既読処理に失敗しました: ${message}`;
  const successMessage = "通知を既読にしました";
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.patch(
      ApiRoutes.notification.default,
      { ids },
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
  } catch (e) {
    return { ok: false, message: failedMessage(String(e)) };
  }
}

export interface SearchResults {
  plans: PlanWithDetails[];
  pagination: Pagination;
}
export const searchPlans = async (
  sort: "popular" | "new" = "popular",
  params: SearchPageParams,
  limit: number = SEARCH_LIMIT
): Promise<SearchResults> => {
  const cookie = (await cookies()).toString();

  // API が 1 始まり前提なので 1 始まりに合わせる
  let allPlanData: PlanWithDetails[] = [];
  let currentPage = 1;
  const targetPage = ((sort === "popular" ? params.pp : params.np) ?? 0) + 1;

  while (true) {
    const sendParams = new URLSearchParams({
      q: params.q || "",
      sort,
      page: currentPage.toString(), // 1 始まり
      limit: limit.toString(),
    }).toString();
    const res = await fetchWrapper.get(
      `${ApiRoutes.plan.create}?${sendParams}`,
      true,
      {
        headers: { Cookie: cookie },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch plan info");
    }

    const data = await res.json();
    const { plans, pagination } = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatPlansPromise = plans.map((plan: any) => formatPlanData(plan));
    const formatPlans = await Promise.all(formatPlansPromise);
    allPlanData = [...allPlanData, ...formatPlans];

    if (currentPage >= targetPage || currentPage >= pagination.totalPages) {
      return {
        plans: allPlanData,
        pagination: {
          ...pagination,
          currentPage,
        },
      };
    }
    currentPage += 1;
  }
};

export interface RecommendResult {
  plans: PlanWithDetails[];
}
export const getRecommendedPlans = async (): Promise<RecommendResult> => {
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.get(
      `${ApiRoutes.plan.create}?sort=popular`,
      true,
      {
        headers: { Cookie: cookie },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch recommended plans");
    }
    const data = await res.json();
    const { plans } = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatPlansPromise = plans.map((plan: any) => formatPlanData(plan));
    const formatPlans = await Promise.all(formatPlansPromise);
    return {
      plans: formatPlans,
    };
  } catch (e) {
    throw new Error(
      "Failed to fetch recommended plans" +
        (e instanceof Error ? e.message : "")
    );
  }
};
