import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView, { UserViewProps } from "../../_components/UserView";
import PlanView from "../../_components/PlanView";
import { getPlans } from "../../actions";
import { User } from "@/types/user";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { Suspense } from "react";
import { cookies } from "next/headers";

// ユーザーデータを取得する関数
const getUserData = async (userId: User["id"]): UserViewProps["userData"] => {
  const url = userId === "me" ? ApiRoutes.auth.me : ApiRoutes.auth.user(userId);

  try {
    const res = await fetchWrapper.get(url, true, {
      headers: { Cookie: (await cookies()).toString() || "" },
      next: { revalidate: 10 },
    });
    console.log(res);
    if (!res.ok) {
      return null;
    }
    const user: User = await res.json();
    return { ...user, favoritesCount: 0, favoredCount: 0, createdCount: 0 };
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
      {/* TODO: 実際のAPIが完成したら置き換える */}
      <Suspense fallback={<div>Loading user data...</div>}>
        <UserView userData={getUserData(userId)} />
      </Suspense>

      <Suspense fallback={<div>Loading plans...</div>}>
        <PlanView
          viewId={MAIN_PAGE_IDs.PLANS}
          plans={(await getPlans("", 0)).planData}
          userId={userId}
        />
      </Suspense>
      <Suspense fallback={<div>Loading favorite plans...</div>}>
        <PlanView
          viewId={MAIN_PAGE_IDs.FAVORITES}
          plans={(await getPlans("", 0)).planData}
          userId={userId}
        />
      </Suspense>
    </main>
  );
};

export default UserPage;
