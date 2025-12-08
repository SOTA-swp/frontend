"use client";
import { MdDragIndicator } from "react-icons/md";
import { useNodeStore } from "../../_store/nodeStore";
import LocationNode from "./LocationNode";
import MoveNode from "./MoveNode";
import ProcessNode from "./ProcessNode";
import clsx from "clsx";

export interface NodeProps {
  id: string;
  depth?: number;
  readOnly?: boolean;
}

function Node({ id, depth = 0 }: NodeProps) {
  const node = useNodeStore((state) => state.nodes[id]);
  const { hoveredNodeId, setHoveredNodeId } = useNodeStore();

  const isHovered = hoveredNodeId === id;

  const handleMouseEnter = () => {
    setHoveredNodeId(id);
  };

  const handleMouseLeave = () => {
    setHoveredNodeId(null);
  };

  if (!node) {
    return null;
  }

  const { nodeType } = node;

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
      className={clsx(
        "flex items-center gap-2",
        nodeType === "process" && "items-start"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <span
        className={clsx(
          "text-text-secondary cursor-grab transition-opacity",
          nodeType === "process" && "mt-4",
          !isHovered && "opacity-0"
        )}>
        <MdDragIndicator />
      </span>
      <span className="flex-1 p-1.5 pr-0">{content}</span>
    </div>
  );
}

export default Node;
