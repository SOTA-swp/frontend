import CommonText from "@/components/CommonText";
import { MAIN_PAGE_IDs } from "../../_consts/MAIN_PAGE_IDs";
import HEADER_HEIGHT from "../../_consts/HEADER_HIGHT";

export interface UserPageProps {
  params: { userId: Promise<string> };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return (
    <div>
      <CommonText level="h1">Home Page</CommonText>
      {Object.values(MAIN_PAGE_IDs).map((id) => (
        <section
          key={id}
          id={id}
          className="h-[200vh]"
          style={{
            scrollMarginTop: HEADER_HEIGHT + 20,
          }}>
          Section: {id} {userId}
        </section>
      ))}
    </div>
  );
};

export default UserPage;
