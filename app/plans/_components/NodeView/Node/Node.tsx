"use client";
import { MouseEvent as ReactMouseEvent } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdDragIndicator,
} from "react-icons/md";
import LocationNode from "./LocationNode";
import MoveNode from "./MoveNode";
import ProcessNode from "./ProcessNode";
import clsx from "clsx";
import IconButton from "@/components/IconButton";
import { AnimatePresence, motion } from "motion/react";
import { useSortable } from "@dnd-kit/sortable";
import { usePlanStore } from "../../../_store/hook";
import AddNodeBar from "../AddNodeBar";
import { NodeData } from "@/types/node";
import { PARENT_ID_ROOT } from "@/app/plans/_util/createNode";

export interface NodeProps {
  id: string;
  parentId?: NodeData["id"];
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
  const moveNodeStep = usePlanStore((state) => state.moveNodeStep);
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id,
    data: { id, type: "node" },
    disabled: isReadOnly,
    transition: null,
  });

  const style = {
    opacity: isDragging ? 0.4 : 1,
    pointerEvents: isDragging ? "none" : "auto",
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
    return <p className="text-error p-2">ノードが見つかりません！</p>;
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
        id={id}
        ref={setNodeRef}
        style={style}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          "relative flex items-center gap-2 select-none",
          isProcessNode && "items-start"
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
            "flex-1 p-2 pr-0",
            !isProcessNode &&
              "border border-r-0 rounded-l-full transition-colors",
            !isProcessNode && !isHovered && "border-transparent",
            !isProcessNode && isHovered && "border-accent  shadow-md"
          )}>
          {content}
        </span>
        <AnimatePresence>
          {!isReadOnly && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-full flex gap-4 p-4 items-center">
              <div className="flex flex-col">
                <motion.div>
                  <IconButton
                    onClick={() => moveNodeStep(id, "up")}
                    icon={<MdArrowUpward />}
                    variant={"iconOnly"}
                    color={"gray"}
                    size={"xs"}
                    title="上に移動する"
                  />
                </motion.div>
                <motion.div>
                  <IconButton
                    onClick={() => moveNodeStep(id, "down")}
                    icon={<MdArrowDownward />}
                    variant={"iconOnly"}
                    color={"gray"}
                    size={"xs"}
                    title="下に移動する"
                  />
                </motion.div>
              </div>
              <motion.span>
                <IconButton
                  onClick={handleDelete}
                  icon={<MdDelete />}
                  color={"error"}
                  title="削除する"
                />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isLast && <AddNodeBar parentId={parentId} order={order + 1} />}
    </>
  );
}

export default Node;
