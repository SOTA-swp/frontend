"use client";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { useNodeStore } from "../../_store/nodeStore";
import LocationNode from "./LocationNode";
import MoveNode from "./MoveNode";
import ProcessNode from "./ProcessNode";
import clsx from "clsx";
import IconButton from "@/components/IconButton";
import { AnimatePresence, motion } from "motion/react";

export interface NodeProps {
  id: string;
  depth?: number;
  readOnly?: boolean;
}

function Node({ id, depth = 0 }: NodeProps) {
  const node = useNodeStore((state) => state.nodes[id]);
  const { hoveredNodeId, setHoveredNodeId, removeNode } = useNodeStore();

  const isHovered = hoveredNodeId === id;

  const handleMouseEnter = () => {
    setHoveredNodeId(id);
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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "relative flex items-center gap-2",
        isProcessNode && "items-start"
      )}>
      <span
        className={clsx(
          "text-text-secondary cursor-grab transition-opacity",
          isProcessNode && "pt-5",
          !isHovered && "opacity-0"
        )}>
        <MdDragIndicator />
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
  );
}

export default Node;
