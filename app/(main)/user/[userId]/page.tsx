import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView, { UserViewProps } from "../../_components/UserView";
import PlanView from "../../_components/PlanView";
import { User } from "@/types/user";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Plan, PlanWithDetails } from "@/types/plan";
import { getMe } from "@/lib/api/auth";
import { fetchUserById } from "@/lib/api/users";
import { getLike } from "@/lib/api/likes";
import { PlanRole } from "@/app/plans/_consts/planRole";

// ユーザーデータを取得する関数
const getUserData = async (userId: User["id"]): UserViewProps["userData"] => {
  const url = userId === "me" ? ApiRoutes.auth.me : ApiRoutes.auth.user(userId);

  try {
    const res = await fetchWrapper.get(url, true, {
      headers: { Cookie: (await cookies()).toString() || "" },
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const user: User = await res.json();
    return { ...user, favoritesCount: 0, favoredCount: 0, createdCount: 0 };
  } catch (_) {
    return null;
  }
};

// プランデータを取得する関数
const getPlans = async (
  userId: User["id"]
): Promise<PlanWithDetails[] | null> => {
  try {
    const me = await getMe();
    const isMe = userId === "me" || (me && me.id === userId);
    // TODO: 他のユーザーのプラン取得APIができたらそちらを使う↓
    const url = isMe ? ApiRoutes.auth.plans : ApiRoutes.auth.userplan(userId);
    const res = await fetchWrapper.get(url, true, {
      headers: { Cookie: (await cookies()).toString() || "" },
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      return null;
    }

    const plans: (Plan & { role: PlanRole })[] = await res.json();
    return Promise.all(
      plans.map(async (plan) => {
        const creator = me || (await fetchUserById(plan.creatorId));
        const likes = await getLike(plan.id);
        if (!creator || !likes) {
          return null;
        }
        return {
          planData: {
            ...plan,
            favorites: likes?.count || 0,
            hasLiked: likes?.hasLiked || false,
          },
          creatorData: creator,
        };
      })
    ).then((results) =>
      results.filter(
        (item): item is Exclude<typeof item, null> => item !== null
      )
    );
  } catch (_) {
    return null;
  }
};

export interface UserPageProps {
  params: Promise<{ userId: User["id"] }>;
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <main className="relative flex-1 ">
      {/* TODO: スケルトンをちゃんと作る */}
      <Suspense fallback={<div>Loading user data...</div>}>
        <UserView userData={getUserData(userId)} />
      </Suspense>

      {/*  */}
      <Suspense fallback={<div>Loading plans...</div>}>
        <PlanView
          viewId={MAIN_PAGE_IDs.PLANS}
          plans={getPlans(userId)}
          userId={userId}
        />
      </Suspense>
      <Suspense fallback={<div>Loading favorite plans...</div>}>
        <PlanView
          viewId={MAIN_PAGE_IDs.FAVORITES}
          plans={getPlans(userId)}
          userId={userId}
        />
      </Suspense>
    </main>
  );
};

export default UserPage;
