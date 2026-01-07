"use server";
import { Plan } from "@/types/plan";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type LikeResponse = {
  count: number;
  hasLiked: boolean;
} | null;

/**
 * いいね情報を取得する
 * @param planId
 * @returns
 */
export const getLike = async (planId: Plan["id"]): Promise<LikeResponse> => {
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.get(ApiRoutes.like.likestate(planId), true, {
      headers: { Cookie: cookie },
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return {
      count: data.count,
      hasLiked: data.hasLiked,
    };
  } catch (_) {
    return null;
  }
};

/**
 * 計画にいいねをする
 * @param planId
 * @returns
 */
export const addLike = async (
  planId: Plan["id"],
  path: string
): Promise<LikeResponse> => {
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.post(
      ApiRoutes.like.like(planId),
      { planId },
      true,
      {
        credentials: "include",
        headers: {
          Cookie: cookie,
        },
      }
    );
    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    revalidatePath(path);

    return {
      count: data.count,
      hasLiked: data.hasLiked,
    };
  } catch (_) {
    return null;
  }
};

/**
 * 計画のいいねを解除する
 * @param planId
 * @returns
 */
export const removeLike = async (
  planId: Plan["id"],
  path: string
): Promise<LikeResponse> => {
  try {
    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.delete(ApiRoutes.like.like(planId), true, {
      credentials: "include",
      headers: {
        Cookie: cookie,
      },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();

    revalidatePath(path);

    return {
      count: data.count,
      hasLiked: data.hasLiked,
    };
  } catch (_) {
    return null;
  }
};
