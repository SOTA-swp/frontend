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
import { PlanRole } from "@/consts/PLAN_ROLE";

// ユーザーデータを取得する関数
const getUserData = async (userId: User["id"]): UserViewProps["userData"] => {
  if (userId === "me") {
    const me = await getMe();
    userId = me?.id || userId;
  }

  try {
    const res = await fetchWrapper.get(ApiRoutes.auth.user(userId), true, {
      headers: { Cookie: (await cookies()).toString() || "" },
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const user: User & {
      stats: {
        createdPlans: number;
        givenLikes: number;
        receivedLikes: number;
      };
    } = await res.json();
    return {
      ...user,
      favoritesCount: user.stats.givenLikes,
      favoredCount: user.stats.receivedLikes,
      createdCount: user.stats.createdPlans,
    };
  } catch (_) {
    return null;
  }
};

// プランデータを取得する関数
const getPlans = async (
  userId: User["id"],
  type: "joined" | "liked"
): Promise<PlanWithDetails[] | null> => {
  try {
    const me = await getMe();
    const isMe = userId === "me" || (me && me.id === userId);
    if (isMe) {
      userId = me?.id || userId;
    }

    const url = (() => {
      if (type === "joined") {
        return isMe ? ApiRoutes.auth.plans : ApiRoutes.auth.userplan(userId);
      } else {
        return ApiRoutes.auth.userlike(userId);
      }
    })();
    const res = await fetchWrapper.get(url, true, {
      headers: { Cookie: (await cookies()).toString() || "" },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return null;
    }

    const plans: (Plan & {
      role: PlanRole;
      creator: Pick<User, "id" | "username">;
      _count: { members: number; likes: number };
      hasLiked: boolean;
    })[] = await res.json();

    return plans.map((plan) => ({
      planData: {
        ...plan,
        favorites: plan._count.likes,
        hasLiked: plan.hasLiked,
        role: plan.role,
      },
      creatorData: {
        id: plan.creator.id,
        username: plan.creator.username,
        email: "",
      },
    }));
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
          plans={getPlans(userId, "joined")}
          userId={userId}
        />
      </Suspense>
      <Suspense fallback={<div>Loading favorite plans...</div>}>
        <PlanView
          viewId={MAIN_PAGE_IDs.FAVORITES}
          plans={getPlans(userId, "liked")}
          userId={userId}
        />
      </Suspense>
    </main>
  );
};

export default UserPage;
