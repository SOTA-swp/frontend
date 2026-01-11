"use client";
import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Node from "./Node/Node";
import { useShallow } from "zustand/shallow";
import { SortableContext } from "@dnd-kit/sortable";
import { usePlanStore } from "../../_store/hook";
import { PARENT_ID_ROOT } from "../../_util/createNode";
import NullBox from "./NullBox";

function NodeThree() {
  const structure = usePlanStore(useShallow((state) => state.structure));
  const rootNodeIds =
    usePlanStore(useShallow((state) => state.structure[PARENT_ID_ROOT])) ?? [];
  const moveNodeInStructure = usePlanStore((state) => state.moveNode);
  const setNestNode = usePlanStore((state) => state.setNestNode);
  const nodes = usePlanStore((state) => state.nodes);
  const locations = usePlanStore((state) => state.locations);

  type OverData =
    | { type: "process"; id: string }
    | { type: "add-bar"; parentId: string; order: number }
    | { type: "node"; id: string };

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<string | null>(null);
  type MoveNodeToFn = (
    parentId: string,
    childId: string,
    order: number
  ) => void;
  const moveNodeTo: MoveNodeToFn | undefined = usePlanStore(
    (state) => (state as unknown as { moveNodeTo?: MoveNodeToFn }).moveNodeTo
  );

  const handleDragStart = (event: DragStartEvent) => {
    const aId = event.active?.data?.current?.id;
    if (aId) setActiveId(String(aId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!active?.data?.current || !over?.data?.current) return;

    const activeIdStr = String(active.data.current.id);
    const overData = over.data.current as unknown as OverData;

    // ProcessNode (empty container) の場合はネスト
    if (overData?.type === "process") {
      const parentId = String(overData.id);
      if (structure[parentId]?.includes(activeIdStr)) return;
      setNestNode(parentId, activeIdStr);
      return;
    }

    // AddNodeBar の挿入スロットにドロップした場合
    if (overData?.type === "add-bar") {
      const { parentId, order } = overData;
      console.log("AddNodeBar drop:", {
        parentId,
        order,
        activeIdStr,
        moveNodeTo: !!moveNodeTo,
      });
      if (
        typeof parentId === "string" &&
        typeof order === "number" &&
        moveNodeTo
      ) {
        moveNodeTo(parentId, activeIdStr, order);
        console.log("moveNodeTo called");
      } else {
        console.warn("moveNodeTo not available or invalid data", {
          parentId,
          order,
          moveNodeTo,
        });
      }
      return;
    }

    // 通常のノード上にドロップ（従来の入れ替え）
    if (overData?.type === "node") {
      const overIdStr = String(overData.id);
      if (activeIdStr !== overIdStr) {
        moveNodeInStructure(activeIdStr, overIdStr);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      {rootNodeIds.length > 0 ? (
        <div className="p-4 mr-25 mb-25 content-start w-fit">
          <div className="flex flex-col">
            <SortableContext items={rootNodeIds}>
              {rootNodeIds.map((nodeId, i) => (
                <Node
                  key={nodeId}
                  id={nodeId}
                  parentId={PARENT_ID_ROOT}
                  order={i}
                  depth={0}
                  isLast={i === rootNodeIds.length - 1}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col p-4 pr-0">
          <NullBox id={PARENT_ID_ROOT} />
        </div>
      )}
      <DragOverlay dropAnimation={null}>
        {activeId && nodes[activeId] ? (
          nodes[activeId].nodeType === "process" ? (
            <div className="px-4 py-2 rounded-lg bg-primary/90 text-paper shadow-lg">
              {nodes[activeId].name || "プロセス"}
            </div>
          ) : (
            <div className="px-4 py-2 rounded-lg bg-paper shadow-lg border border-primary/20">
              {nodes[activeId].nodeType === "location"
                ? nodes[activeId].name ||
                  locations[nodes[activeId].locationId]?.title ||
                  "ロケーション"
                : "移動"}
            </div>
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default NodeThree;
