import NodeThree from "./NodeThree";
import ViewWrapper from "./ViewWrapper";

function NodeView() {
  return (
    <ViewWrapper overflow="auto">
      <NodeThree />
    </ViewWrapper>
  );
}

export default NodeView;
