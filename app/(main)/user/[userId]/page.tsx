import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView from "../../_components/UserView";
import PlanView from "../../_components/PlanView";
import UserType from "@/types/user";

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

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <main className="relative flex-1 overflow-hidden">
      {/* TODO: 実際のAPIが完成したら置き換える */}
      <UserView userData={await createUserViewMockData(await userId)} />
      <PlanView viewId={MAIN_PAGE_IDs.PLANS} plans={[]} />
      <PlanView viewId={MAIN_PAGE_IDs.FAVORITES} plans={[]} />
      {/* {Object.values(MAIN_PAGE_IDs).map((id) => (
        <section
          key={id}
          id={id}
          className="h-[200vh]"
          style={{
            scrollMarginTop: HEADER_HEIGHT + 20,
          }}>
          Section: {id} {userId}
        </section>
      ))} */}
    </main>
  );
};

export default UserPage;
