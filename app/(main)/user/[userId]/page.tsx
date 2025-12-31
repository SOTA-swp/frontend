import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView from "../../_components/UserView";
import PlanView from "../../_components/PlanView";
import { getPlans, getUserData } from "../../actions";

export interface UserPageProps {
  params: { userId: Promise<string> };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;
  const awaitUserId = await userId;

  return (
    <main className="relative flex-1 ">
      {/* TODO: 実際のAPIが完成したら置き換える */}
      <UserView userData={await getUserData(awaitUserId)} />
      <PlanView
        viewId={MAIN_PAGE_IDs.PLANS}
        plans={(await getPlans("", 0)).planData}
      />
      <PlanView
        viewId={MAIN_PAGE_IDs.FAVORITES}
        plans={(await getPlans("", 0)).planData}
      />

      {/* お気に入りの下の余白を作る */}
      <div className="min-h-[50dvh]" />
    </main>
  );
};

export default UserPage;
