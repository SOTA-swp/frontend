import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import UserView from "../../_components/UserView";
import PlanView from "../../_components/PlanView";

export interface UserPageProps {
  params: { userId: Promise<string> };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <UserView userData={undefined} />
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
    </div>
  );
};

export default UserPage;
