import UserType from "@/types/user";

export interface ViewPageProps {
  params: { planId: Promise<UserType["id"]> };
}

const ViewPage: React.FC<ViewPageProps> = async ({ params }) => {
  const { planId } = await params;
  return <div>planId: {planId}</div>;
};

export default ViewPage;
