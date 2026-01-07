"use server";

import { User } from "@/types/user";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";

/**
 * 自分のユーザーデータを取得(サーバーサイド)
 */
export const getMe = async (): Promise<User | null> => {
  const res = await fetchWrapper.get(ApiRoutes.auth.me, true, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const user: User = await res.json();
  return user;
};
