import NodeType from "@/types/node";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

interface NodeStore {
  // ノードデータを管理するストア
  nodes: Record<string, NodeType>;
  structure: Record<NodeType["id"], NodeType["id"][]>;
  setNodes: (nodeList: NodeType[]) => void;
  setStructure: (structure: Record<NodeType["id"], NodeType["id"][]>) => void;
  setStructureList: (id: NodeType["id"], childrenIds: NodeType["id"][]) => void;
  moveNodeInStructure: (
    activeId: NodeType["id"],
    overId: NodeType["id"]
  ) => void;
  updateNode: (id: string, updatedFields: Partial<NodeType>) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, newParentId: string) => void;

  //  ノードの中の編集中要素を管理するストア
  editFieldId: string | null;
  setEditFieldId: (nodeId: string | null) => void;

  // ホバー中のノードIDを管理するストア
  hoveredNodeId: string | null;
  setHoveredNodeId: (nodeId: string | null) => void;

  // 折りたたまれたノードIDを管理するストア
  closeNodeIds: NodeType["id"][];
  closeNode: (nodeId: NodeType["id"]) => void;
  openNode: (nodeId: NodeType["id"]) => void;
}

export const useNodeStore = create<NodeStore>((set) => ({
  nodes: {},
  structure: {},

  setNodes: (nodeList) => {
    const nodesMap: Record<string, NodeType> = nodeList.reduce((acc, nodes) => {
      acc[nodes.id] = nodes;
      return acc;
    }, {} as Record<string, NodeType>);
    set({ nodes: nodesMap });
  },
  setStructure: (structure) => set({ structure }),
  setStructureList: (id, childrenIds) =>
    set((state) => ({
      structure: {
        ...state.structure,
        [id]: childrenIds,
      },
    })),
  moveNodeInStructure: (activeId, overId) => {
    set((state) => {
      const structure = { ...state.structure };

      const findParentId = (nodeId: NodeType["id"]) =>
        Object.keys(structure).find((parentId) =>
          structure[parentId].includes(nodeId)
        );

      const activeParentId = findParentId(activeId);
      const overParentId = findParentId(overId);

      if (!activeParentId || !overParentId) return state;

      if (activeParentId === overParentId) {
        const children = structure[activeParentId];
        const oldIndex = children.indexOf(activeId);
        const newIndex = children.indexOf(overId);
        structure[activeParentId] = arrayMove(children, oldIndex, newIndex);
        return { structure: { ...structure } };
      }

      structure[activeParentId] = structure[activeParentId].filter(
        (id) => id !== activeId
      );

      const newChildren = structure[overParentId];
      const overIndex = newChildren.indexOf(overId);
      newChildren.splice(overIndex, 0, activeId);
      structure[overParentId] = newChildren;
      return { structure: { ...structure } };
    });
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

  closeNodeIds: [],
  closeNode: (nodeId) =>
    set((state) => ({ closeNodeIds: [...state.closeNodeIds, nodeId] })),
  openNode: (nodeId) => {
    set((state) => ({
      closeNodeIds: state.closeNodeIds.filter((id) => id !== nodeId),
    }));
  },
}));
