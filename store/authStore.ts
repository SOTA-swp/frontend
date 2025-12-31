import { User } from "@/types/user";
import { ApiRoutes } from "api-contract";
import { StateCreator } from "zustand";

type AuthUser = Pick<User, "id" | "name" | "email">;

export interface AuthStoreState {
  user: AuthUser | null;
  isLoading: boolean;
}

interface AuthStoreActions {
  refetch: (onFailed?: () => void) => Promise<boolean>;
  logout: () => Promise<void>;
}

const defaultAuthStore: AuthStoreState = {
  user: null,
  isLoading: true,
};

export type AuthStore = AuthStoreState & AuthStoreActions;

export const createAuthStoreSlice: StateCreator<AuthStore> = (set, get) => {
  return {
    ...defaultAuthStore,
    refetch: async (onFailed) => {
      let ok = false;
      try {
        set({ isLoading: true });

        const response = await fetch(ApiRoutes.auth.me);

        if (response.ok) {
          const data: AuthUser = await response.json();
          ok = true;
          set({ user: { ...data } });
        } else {
          set({ user: null });
          onFailed?.();
        }
      } catch (_) {
        set({ user: null });
        onFailed?.();
      } finally {
        set({ isLoading: false });
        return ok;
      }
    },
    logout: async () => {
      try {
        await fetch(ApiRoutes.auth.logout, {
          method: "POST",
        });
      } catch (_) {
        // console.error("ログアウトAPIの呼び出しに失敗", error);
      } finally {
        await get().refetch();
      }
    },
  };
};
