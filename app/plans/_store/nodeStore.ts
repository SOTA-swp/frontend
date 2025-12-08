import NodeType from "@/types/node";
import { create } from "zustand";

interface NodeStore {
  // ノードデータを管理するストア
  nodes: Record<string, NodeType>;
  setNodes: (nodeList: NodeType[]) => void;
  updateNode: (id: string, updatedFields: Partial<NodeType>) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, newParentId: string) => void;

  //  ノードの中の編集中要素を管理するストア
  editFieldId: string | null;
  setEditFieldId: (nodeId: string | null) => void;

  // ホバー中のノードIDを管理するストア
  hoveredNodeId: string | null;
  setHoveredNodeId: (nodeId: string | null) => void;
}

export const useNodeStore = create<NodeStore>((set) => ({
  nodes: {},

  setNodes: (nodeList) => {
    const nodesMap: Record<string, NodeType> = nodeList.reduce((acc, nodes) => {
      acc[nodes.id] = nodes;
      return acc;
    }, {} as Record<string, NodeType>);
    set({ nodes: nodesMap });
  },
  updateNode: (id, updateFields) => {
    console.log("updateNode", id, updateFields);
    set((state) => ({
      nodes: {
        ...state.nodes,
        [id]: {
          ...state.nodes[id],
          ...updateFields,
        },
      },
    }));
  },
  removeNode: (id) => {
    set((state) => {
      const newNodes = { ...state.nodes };
      delete newNodes[id];
      return { nodes: newNodes };
    });
  },
  moveNode: (id, newParentId) => {
    set((state) => ({
      nodes: {
        ...state.nodes,
        [id]: {
          ...state.nodes[id],
          parentId: newParentId,
        },
      },
    }));
  },

  editFieldId: null,
  setEditFieldId: (nodeId) => set({ editFieldId: nodeId }),

  hoveredNodeId: null,
  setHoveredNodeId: (nodeId) => set({ hoveredNodeId: nodeId }),
}));
