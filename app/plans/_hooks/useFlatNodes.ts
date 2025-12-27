import NodeDataType from "@/types/node";
import { NodeStore } from "../_store/nodeStore";
import { PARENT_ID_ROOT } from "../_util/createNode";
import { useMemo } from "react";

// 再帰的なノード構造をフラットな配列に変換するフック
export const useFlatNodes = (nodes: NodeStore["structure"]) => {
  const flatNodes: NodeDataType["id"][] = useMemo(() => {
    const newFlatNodes: NodeDataType["id"][] = [];
    const traverse = (id: NodeDataType["id"]) => {
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
