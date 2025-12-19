"use client";
import { useRef } from "react";
import { useNodeStore } from "../../_store/nodeStore";
import {
  closestCenter,
  DndContext,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Node from "./Node";
import { useShallow } from "zustand/shallow";
import { SortableContext } from "@dnd-kit/sortable";

function NodeThree() {
  const structure = useNodeStore(useShallow((state) => state.structure));
  const rootNodeIds = Object.entries(useNodeStore((state) => state.nodes))
    .filter(([nodeId]) => {
      const allChildren = Object.values(structure).flat();
      return !allChildren.includes(nodeId);
    })
    .map(([nodeId]) => nodeId);
  const moveNodeInStructure = useNodeStore((state) => state.moveNode);
  const setNestNode = useNodeStore((state) => state.setNestNode);

  // 最後に実行したターゲットを記憶（ターゲット変更時のみ実行）
  const lastExecutedRef = useRef<{
    activeId: string;
    overId: string;
  } | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active.data.current || !over?.data.current) return;

    const activeId = active.data.current.id;
    const overId = over.data.current.id;

    if (!activeId || !overId || activeId === overId) return;

    // ターゲットが前回と同じならスキップ（二重実行防止）
    if (
      lastExecutedRef.current?.activeId === activeId &&
      lastExecutedRef.current?.overId === overId
    ) {
      return;
    }

    lastExecutedRef.current = { activeId, overId };

    // ProcessNode (drop target) の場合は、setNestNode を使ってネストさせる
    if (over.data.current?.type === "process") {
      if (structure[String(overId)]?.includes(String(activeId))) {
        return;
      }
      setNestNode(String(overId), String(activeId));
      console.log("drop to ProcessNode:", activeId, "->", overId);
    } else {
      // 通常のノード移動
      moveNodeInStructure(String(activeId), String(overId));
      console.log("move node:", activeId, overId);
    }
  };

  const handleDragEnd = () => {
    // ドラッグ終了時に記憶をリセット
    lastExecutedRef.current = null;
    console.log("drag end");
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <div className="p-4 flex flex-col gap-2">
        <SortableContext items={rootNodeIds}>
          {rootNodeIds.map((nodeId) => (
            <Node key={nodeId} id={nodeId} depth={0} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

export default NodeThree;
