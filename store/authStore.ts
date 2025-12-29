import { User } from "@/types/user";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { StateCreator } from "zustand";

type AuthUser = Pick<User, "id" | "name" | "email">;

export interface AuthStoreState {
  user: AuthUser | null;
  isLoading: boolean;
}

interface AuthStoreActions {
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthStore: AuthStoreState = {
  user: null,
  isLoading: true,
};

export type AuthStore = AuthStoreState & AuthStoreActions;

export const createAuthStoreSlice: StateCreator<AuthStore> = (set) => {
  const fetchMe = async () => {
    try {
      set({ isLoading: true });

      const response = await fetchWrapper.get(ApiRoutes.auth.me);

      if (response.ok) {
        const data: AuthUser = await response.json();
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (_) {
      // console.error("本人確認に失敗しました", error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  };

  // 初期化時にfetchMeを実行（クライアント側のみ）
  if (typeof window !== "undefined") {
    fetchMe();
  }

  return {
    ...defaultAuthStore,
    refetch: fetchMe,
    logout: async () => {
      try {
        await fetch(ApiRoutes.auth.logout, {
          method: "POST",
        });
      } catch (_) {
        // console.error("ログアウトAPIの呼び出しに失敗", error);
      } finally {
        await fetchMe();
      }
    },
  };
};
