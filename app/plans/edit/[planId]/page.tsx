import UserType from "@/types/user";

export interface EditPageProps {
  params: { planId: Promise<UserType["id"]> };
}

const EditPage: React.FC<EditPageProps> = async ({ params }) => {
  const { planId } = await params;
  // TODO: 権限があるかどうか調べて、なければplan/viewにリダイレクトする
  return <div>planId: {planId}</div>;
};

export default EditPage;
