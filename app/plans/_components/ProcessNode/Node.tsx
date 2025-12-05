"use client";
import { useNodeStore } from "../../_store/nodeStore";
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

  if (node.nodeType === "process") {
    return <ProcessNode {...node} />;
  }
}

export default Node;
