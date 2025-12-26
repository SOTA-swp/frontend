import { useCallback } from "react";
import { NODE_VIEW_ID } from "../_components/NodeView";

// NodeViewにノードを追加し、そのノードにスクロールするフック
export const useAddWithScroll = (onAdd: () => void) => {
  const addAndScroll = useCallback(() => {
    onAdd();
    setTimeout(() => {
      const nodeView = document.getElementById(NODE_VIEW_ID);
      if (nodeView) {
        nodeView.scrollTo({
          top: nodeView.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  }, [onAdd]);

  return { addAndScroll };
};
