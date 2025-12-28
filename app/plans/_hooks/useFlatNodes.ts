import NodeData from "@/types/node";
import { NodeStore } from "../_store/nodeStore";
import { PARENT_ID_ROOT } from "../_util/createNode";
import { useMemo } from "react";

// 再帰的なノード構造をフラットな配列に変換するフック
export const useFlatNodes = (nodes: NodeStore["structure"]) => {
  const flatNodes: NodeData["id"][] = useMemo(() => {
    const newFlatNodes: NodeData["id"][] = [];
    const traverse = (id: NodeData["id"]) => {
      const children = nodes[id] || [];
      children.forEach((child) => {
        newFlatNodes.push(child);
        traverse(child);
      });
    };
    traverse(PARENT_ID_ROOT);
    return newFlatNodes;
  }, [nodes]);

  return flatNodes;
};
