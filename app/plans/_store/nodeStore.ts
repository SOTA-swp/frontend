import NodeType from "@/types/node";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

interface NodeStore {
  // ノードデータを管理するストア
  nodes: Record<NodeType["id"], NodeType>;
  structure: Record<NodeType["id"], NodeType["id"][]>;
  setNodes: (nodeList: NodeType[]) => void;
  setStructure: (structure: Record<NodeType["id"], NodeType["id"][]>) => void;
  setStructureList: (id: NodeType["id"], childrenIds: NodeType["id"][]) => void;
  moveNode: (activeId: NodeType["id"], overId: NodeType["id"]) => void;
  updateNode: (id: string, updatedFields: Partial<NodeType>) => void;
  removeNode: (id: string) => void;
  setNestNode: (parentId: NodeType["id"], childId: NodeType["id"]) => void;

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

const isDescendant = (
  structure: Record<NodeType["id"], NodeType["id"][]>,
  ancestorId: NodeType["id"],
  targetId: NodeType["id"]
): boolean => {
  const children = structure[ancestorId] || [];
  if (children.includes(targetId)) return true;
  return children.some((childId) => isDescendant(structure, childId, targetId));
};

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
  moveNode: (activeId, overId) => {
    set((state) => {
      const structure = { ...state.structure };

      if (isDescendant(structure, activeId, overId)) {
        return state;
      }

      const findParentId = (nodeId: NodeType["id"]) =>
        Object.keys(structure).find((parentId) =>
          structure[parentId].includes(nodeId)
        );

      const activeParentId = findParentId(activeId);
      const overParentId = findParentId(overId);

      if (!activeParentId || !overParentId) return state;

      if (activeParentId === overId) return state;

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
  setNestNode: (parentId, childId) => {
    set((state) => {
      console.log(`setNestNode: ${parentId}, ${childId}`);
      if (parentId === childId) {
        return state;
      }
      if (isDescendant(state.structure, childId, parentId)) {
        return state;
      }
      if (state.structure[parentId]?.includes(childId)) {
        return state;
      }
      const structure = { ...state.structure };
      Object.keys(structure).forEach((pid) => {
        structure[pid] = structure[pid].filter((cid) => cid !== childId);
      });
      if (parentId && !structure[parentId]) {
        structure[parentId] = [];
      }
      structure[parentId].push(childId);
      return { structure };
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
