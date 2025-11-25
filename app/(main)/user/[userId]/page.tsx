import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView from "../../_components/UserView";
import PlanView from "../../_components/PlanView";
import UserType, { createMockUser } from "@/types/user";
import { createMockPlan } from "@/types/plan";

export interface UserPageProps {
  params: { userId: Promise<string> };
}

async function createUserViewMockData(userId: string): Promise<
  UserType & {
    favoritesCount: number;
    favoredCount: number;
    createdCount: number;
  }
> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: userId,
    googleUserId: "??",
    name: `ユーザー${userId}`,
    email: `${userId}@mail.com`,
    picture: "/mock/img/user.png",
    createdAt: "2025-11-23T12:00:00.000Z",
    updatedAt: "2025-11-23T12:00:00.000Z",
    favoritesCount: 999,
    favoredCount: 999,
    createdCount: 999,
  };
}

async function createPlanViewMockData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Array.from({ length: 2 }).map((_, i) => ({
    planData: { favorites: 999, ...createMockPlan(i + 1) },
    userData: createMockUser(i + 1),
  }));
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <main className="relative flex-1 ">
      {/* TODO: 実際のAPIが完成したら置き換える */}
      <UserView userData={await createUserViewMockData(await userId)} />
      <PlanView
        viewId={MAIN_PAGE_IDs.PLANS}
        plans={await createPlanViewMockData()}
      />
      <PlanView
        viewId={MAIN_PAGE_IDs.FAVORITES}
        plans={await createPlanViewMockData()}
      />

      {/* お気に入りの下の余白を作る */}
      <div className="min-h-[50dvh]" />
    </main>
  );
};

export default UserPage;
