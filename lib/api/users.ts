"use server";

import { UserMinimal } from "@/types/user";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";

/**
 * ユーザーをIDで取得
 */
export async function fetchUserById(
  userId: string
): Promise<UserMinimal | null> {
  try {
    const res = await fetchWrapper.get(ApiRoutes.auth.user(userId), true);
    if (!res.ok) {
      return null;
    }
    const user: UserMinimal = await res.json();
    return user;
  } catch (_) {
    return null;
  }
}
