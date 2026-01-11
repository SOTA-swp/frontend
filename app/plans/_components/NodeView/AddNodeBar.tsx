"use client";
import IconButton from "@/components/IconButton";
import { NODE_TYPE_ITEMS } from "./NODE_ITEMS";
import { motion } from "motion/react";
import { NODE_TYPES, NodeData, NodeType } from "@/types/node";
import { usePlanStore } from "@/app/plans/_store/hook";
import { useAddNode } from "../../_hooks/useAddNode";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { MAX_DEPTH } from "../../_consts/node";

interface AddNodeBarProps {
  parentId: NodeData["id"];
  order: number;
  depth: number;
  notAnimation?: boolean;
}

function AddNodeBar({
  parentId,
  order,
  depth,
  notAnimation = false,
}: AddNodeBarProps) {
  const isReadOnly = usePlanStore((state) => state.isReadOnly);
  const { handleAddNode } = useAddNode(false);

  // ドラッグ中の要素を追跡
  const [dragging, setDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // 自分自身へのドロップを無効化
  const isDisabled = draggedNodeId === parentId;

  const { setNodeRef, isOver } = useDroppable({
    id: `addbar-${parentId}-${order}`,
    data: { type: "add-bar", parentId, order },
    disabled: isDisabled || false,
  });

  useDndMonitor({
    onDragStart(event) {
      setDragging(true);
      const nodeId = event.active?.data?.current?.id;
      if (nodeId) setDraggedNodeId(String(nodeId));
    },
    onDragEnd() {
      setDragging(false);
      setDraggedNodeId(null);
    },
    onDragCancel() {
      setDragging(false);
      setDraggedNodeId(null);
    },
  });

  if (isReadOnly) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      className="relative pr-2 h-3 flex items-center justify-center">
      {/* ドラッグ中のハイライト線 */}
      {dragging && isOver && (
        <div className="border-2 border-accent bg-accent/10 absolute left-0 right-2 h-1 rounded-full" />
      )}

      {/* 通常時のアイコン群 */}
      {(!dragging || notAnimation) && (
        <motion.div
          initial={"close"}
          animate={notAnimation ? "open" : "close"}
          whileHover={"open"}
          variants={{ close: { opacity: 0 }, open: { opacity: 1 } }}
          className="relative w-full h-full flex items-center justify-center">
          {!notAnimation && (
            <motion.hr
              variants={{
                close: { width: 0 },
                open: { width: "100%" },
              }}
              className="border-accent border-dashed absolute left-0"
            />
          )}
          <motion.div
            variants={{
              open: { transition: { staggerChildren: 0.05 } },
              close: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
            className="absolute flex gap-6">
            {Object.entries(NODE_TYPE_ITEMS).map(
              ([type, { title, icon }]) =>
                !(depth > MAX_DEPTH && type === NODE_TYPES.PROCESS) && (
                  <motion.div
                    key={type}
                    variants={{
                      close: { opacity: 0, x: -20, rotate: -90 },
                      open: { opacity: 1, x: 0, rotate: 0 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}>
                    <IconButton
                      onClick={() =>
                        handleAddNode(type as NodeType, parentId, order)
                      }
                      title={`${title}を追加`}
                      icon={icon}
                      color={notAnimation ? "gray" : "accent"}
                      variant={notAnimation ? "outline" : "contain"}
                      size={"sm"}
                    />
                  </motion.div>
                )
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default AddNodeBar;
