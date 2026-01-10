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
import RouteCalcButton from "./RouteCalcButton";
import TimeRecalcButton from "./TimeRecalcButton";

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
      <div className="sticky top-0 z-10 flex justify-end p-4 pb-0 pointer-events-none">
        <div className="pointer-events-auto flex gap-2">
          <RouteCalcButton />
          <TimeRecalcButton />
        </div>
      </div>
      <NodeThree />
    </ViewWrapper>
  );
}

export default NodeView;
