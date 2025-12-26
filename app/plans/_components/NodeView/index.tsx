"use client";
import { ReactNode, useState } from "react";
import NodeThree from "./NodeThree";
import ViewWrapper from "../ViewWrapper";
import IconButton from "@/components/IconButton";
import AddButton from "../AddButton";
import { usePlanStore } from "../../_store/hook";
import { NODE_TYPES, NodeType } from "@/types/node";
import { createNode } from "../../_util/createNode";
import { NODE_TYPE_ITEMS } from "./NODE_ITEMS";
import { useAddWithScroll } from "../../_hooks/useAddWithScroll";

export const NODE_VIEW_ID = "node-view";

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

  const { addAndScroll } = useAddWithScroll(handleAddNode);

  const addButtonChildrenNodes: ReactNode[] = Object.entries(
    NODE_TYPE_ITEMS
  ).map(([mode, { title, icon }]) => (
    <IconButton
      key={mode}
      title={title}
      icon={icon}
      onClick={() => handleModeChange(mode as NodeType)}
      size={"md"}
      variant={addMode === mode ? "contain" : "outline"}
    />
  ));
  return (
    <AddButton onClick={addAndScroll} childButtons={addButtonChildrenNodes} />
  );
}

function NodeView() {
  return (
    <ViewWrapper
      overflow="auto"
      outerElement={<NodeViewAddButton />}
      id={NODE_VIEW_ID}>
      <NodeThree />
    </ViewWrapper>
  );
}

export default NodeView;
