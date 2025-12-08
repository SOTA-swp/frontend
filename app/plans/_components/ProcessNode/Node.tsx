"use client";
import { useNodeStore } from "../../_store/nodeStore";
import LocationNode from "./LocationNode";
import MoveNode from "./MoveNode";
import ProcessNode from "./ProcessNode";

export interface NodeProps {
  id: string;
  readOnly?: boolean;
}

function Node({ id }: NodeProps) {
  const node = useNodeStore((state) => state.nodes[id]);

  if (!node) {
    return null;
  }

  const content = (() => {
    if (node.nodeType === "process") {
      return <ProcessNode {...node} />;
    } else if (node.nodeType === "move") {
      return <MoveNode {...node} />;
    } else if (node.nodeType === "location") {
      return <LocationNode {...node} />;
    } else {
      return null;
    }
  })();

  return <div>{content}</div>;
}

export default Node;
