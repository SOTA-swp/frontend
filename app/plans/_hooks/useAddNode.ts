import { NODE_TYPES, NodeData, NodeType } from "@/types/node";
import { createNode } from "../_util/createNode";
import { usePlanStore } from "../_store/hook";
import { scrollToId } from "@/utils/scroll";
import { NODE_VIEW_ID } from "../_components/NodeView";
import { toast } from "sonner";

// createNodeを使うにしても、処理が重なるので共通化しておく
export const useAddNode = (scroll: boolean = false) => {
  const addNode = usePlanStore((state) => state.addNode);
  const locationId = usePlanStore((state) => Object.keys(state.locations)[0]);

  const handleAddNode = (
    type: NodeType,
    parentId?: NodeData["id"],
    order?: number
  ) => {
    try {
      const newNode = createNode(
        type,
        type === NODE_TYPES.LOCATION ? { locationId } : {}
      );
      addNode(newNode, parentId, order);
      if (scroll) scrollToId(NODE_VIEW_ID, newNode.id);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  return { handleAddNode };
};
