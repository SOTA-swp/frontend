import PlanMainContent from "../../_components/PlanMainContent";

const ViewPage = async ({}) => {
  // TODO: 閲覧権限があるかどうか調べて、なければエラーページを出す
  // TODO: Storeに反映されるまでラグがあるかも
  return <PlanMainContent readOnly />;
};

export default ViewPage;
