import PlanMainContent from "../../_components/PlanMainContent";

const EditPage = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;
  // TODO: 権限があるかどうか調べて、なければplan/viewにリダイレクトする
  return <PlanMainContent planId={planId} />;
};

export default EditPage;
