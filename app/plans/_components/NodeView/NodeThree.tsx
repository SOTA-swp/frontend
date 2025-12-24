"use client";
import { useRef } from "react";
import {
  closestCorners,
  DndContext,
  DragOverEvent,
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
      // console.log("drop to ProcessNode:", activeId, "->", overId);
    } else {
      // 通常のノード移動
      moveNodeInStructure(String(activeId), String(overId));
      // console.log("move node:", activeId, overId);
    }
  };

  const handleDragEnd = () => {
    // ドラッグ終了時に記憶をリセット
    lastExecutedRef.current = null;
    // console.log("drag end");
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      {rootNodeIds.length > 0 ? (
        <div className="p-4 mr-[100px] content-start w-fit">
          <div className="flex flex-col gap-2">
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
    </DndContext>
  );
}

export default NodeThree;
