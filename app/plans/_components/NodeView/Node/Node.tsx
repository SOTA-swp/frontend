"use client";
import { MouseEvent as ReactMouseEvent } from "react";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import LocationNode from "./LocationNode";
import MoveNode from "./MoveNode";
import ProcessNode from "./ProcessNode";
import clsx from "clsx";
import IconButton from "@/components/IconButton";
import { AnimatePresence, motion } from "motion/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePlanStore } from "../../../_store/hook";
import AddNodeBar from "../AddNodeBar";
import NodeDataType from "@/types/node";
import { PARENT_ID_ROOT } from "@/app/plans/_util/createNode";

export interface NodeProps {
  id: string;
  parentId?: NodeDataType["id"];
  order?: number;
  depth?: number;
  isLast?: boolean;
  readOnly?: boolean;
}

function Node({
  id,
  parentId = PARENT_ID_ROOT,
  order = 0,
  depth = 0,
  isLast = false,
}: NodeProps) {
  const node = usePlanStore((state) => state.nodes[id]);
  const hoveredNodeId = usePlanStore((state) => state.hoveredNodeId);
  const setHoveredNodeId = usePlanStore((state) => state.setHoveredNodeId);
  const removeNode = usePlanStore((state) => state.removeNode);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { id, type: "node" } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    pointerEvents: isDragging ? "none" : "auto",
    zIndex: isDragging ? 999 : undefined,
  } as React.CSSProperties;

  const isHovered = hoveredNodeId === id;

  const handleMouseOver = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (hoveredNodeId !== id) {
      setHoveredNodeId(id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredNodeId(null);
  };

  const handleDelete = () => {
    removeNode(id);
  };

  if (!node) {
    return null;
  }

  const { nodeType } = node;
  const isProcessNode = nodeType === "process";

  const content = (() => {
    if (nodeType === "process") {
      return <ProcessNode {...node} depth={depth} />;
    } else if (nodeType === "move") {
      return <MoveNode {...node} />;
    } else if (nodeType === "location") {
      return <LocationNode {...node} />;
    } else {
      return null;
    }
  })();

  return (
    <>
      <AddNodeBar parentId={parentId} order={order} />
      <div
        ref={setNodeRef}
        style={style}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          "relative flex items-center gap-2 select-none",
          isProcessNode && "items-start",
          isDragging && "opacity-80"
        )}>
        <span
          className={clsx(
            "text-text-secondary cursor-grab transition-opacity",
            isProcessNode && "pt-5",
            !isHovered && "opacity-0"
          )}>
          <span {...attributes} {...listeners}>
            <MdDragIndicator />
          </span>
        </span>
        <span
          className={clsx(
            "flex-1 p-2 pr-0 ",
            !isProcessNode &&
              "border border-r-0 rounded-l-full transition-colors",
            !isProcessNode && !isHovered && "border-transparent",
            !isProcessNode && isHovered && "border-accent  shadow-md"
          )}>
          {content}
        </span>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-full p-4">
              <IconButton
                onClick={handleDelete}
                icon={<MdDelete />}
                color={"error"}
                title="削除する"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isLast && <AddNodeBar parentId={parentId} order={order + 1} />}
    </>
  );
}

export default Node;
