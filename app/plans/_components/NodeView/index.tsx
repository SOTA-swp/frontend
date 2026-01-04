"use client";
import { ReactNode, useState } from "react";
import NodeThree from "./NodeThree";
import ViewWrapper from "../ViewWrapper";
import IconButton from "@/components/IconButton";
import AddButton from "../AddButton";
import { usePlanStore } from "../../_store/hook";
import { NODE_TYPES, NodeType } from "@/types/node";
import { NODE_TYPE_ITEMS } from "./NODE_ITEMS";
import { useAddNode } from "../../_hooks/useAddNode";

export const NODE_VIEW_ID = "node-view";

function NodeViewAddButton() {
  const [addMode, setAddMode] = useState<NodeType>(NODE_TYPES.PROCESS);
  const isReadOnly = usePlanStore((state) => state.isReadOnly);
  const { handleAddNode } = useAddNode(true);

  if (isReadOnly) {
    return null;
  }

  const handleModeChange = (mode: NodeType) => {
    setAddMode(mode);
  };

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
    <AddButton
      onClick={() => handleAddNode(addMode)}
      childButtons={addButtonChildrenNodes}
    />
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
