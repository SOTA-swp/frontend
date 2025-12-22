import { ReactNode, useState } from "react";
import NodeThree from "./NodeThree";
import ViewWrapper from "../ViewWrapper";
import { MdDirectionsCar, MdFolderOpen, MdLocationPin } from "react-icons/md";
import IconButton from "@/components/IconButton";
import AddButton from "../AddButton";
import { usePlanStore } from "../../_store/hook";
import { NODE_TYPES, NodeType } from "@/types/node";
import { createNode } from "../../_util/createNode";

function NodeViewAddButton() {
  const [addMode, setAddMode] = useState<NodeType>(NODE_TYPES.PROCESS);
  const addNode = usePlanStore((state) => state.addNode);

  const handleModeChange = (mode: NodeType) => {
    setAddMode(mode);
  };

  const handleAddNode = () => {
    const newNode = createNode(addMode);
    addNode(newNode);
  };

  const addButtonChildrenData: {
    mode: NodeType;
    title: string;
    icon: ReactNode;
  }[] = [
    {
      mode: NODE_TYPES.PROCESS,
      title: "プロセス",
      icon: <MdFolderOpen />,
    },
    {
      mode: NODE_TYPES.MOVE,
      title: "移動",
      icon: <MdDirectionsCar />,
    },
    {
      mode: NODE_TYPES.LOCATION,
      title: "ロケーション",
      icon: <MdLocationPin />,
    },
  ];
  const addButtonChildrenNodes: ReactNode[] = addButtonChildrenData.map(
    (data) => (
      <IconButton
        {...data}
        key={data.mode}
        onClick={() => handleModeChange(data.mode)}
        size={"md"}
        variant={addMode === data.mode ? "contain" : "outline"}
      />
    )
  );
  return (
    <AddButton onClick={handleAddNode} childButtons={addButtonChildrenNodes} />
  );
}

function NodeView() {
  return (
    <ViewWrapper overflow="auto" outerElement={<NodeViewAddButton />}>
      <NodeThree />
    </ViewWrapper>
  );
}

export default NodeView;
