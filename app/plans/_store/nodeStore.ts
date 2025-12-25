import NodeDataType from "@/types/node";
import { arrayMove } from "@dnd-kit/sortable";
import { StateCreator } from "zustand";
import { PARENT_ID_ROOT } from "../_util/createNode";

export interface NodeState {
  nodes: Record<NodeDataType["id"], NodeDataType>;
  structure: Record<NodeDataType["id"], NodeDataType["id"][]>;
  editFieldId: string | null;

  // ホバー中のノードID
  hoveredNodeId: string | null;

  // 折りたたまれたノードIDリスト
  closeNodeIds: NodeDataType["id"][];
}

export interface NodeActions {
  setNodes: (nodeList: NodeDataType[]) => void;
  setStructure: (
    structure: Record<NodeDataType["id"], NodeDataType["id"][]>
  ) => void;
  moveNode: (activeId: NodeDataType["id"], overId: NodeDataType["id"]) => void;
  addNode: (
    node: NodeDataType,
    parentId?: NodeDataType["id"],
    order?: number
  ) => void;
  updateNode: (id: string, updatedFields: Partial<NodeDataType>) => void;
  removeNode: (id: string) => void;
  setNestNode: (
    parentId: NodeDataType["id"],
    childId: NodeDataType["id"]
  ) => void;

  // ノードの中の編集中要素をセットする関数
  setEditFieldId: (nodeId: string | null) => void;

  // ホバー中のノードIDをセットする関数
  setHoveredNodeId: (nodeId: string | null) => void;

  // 折りたたまれたノードIDを管理する関数
  closeNode: (id: NodeDataType["id"]) => void;
  openNode: (id: NodeDataType["id"]) => void;
}

export type NodeStore = NodeState & NodeActions;

export const defaultNodeStore: NodeState = {
  nodes: {},
  structure: {},
  editFieldId: null,
  hoveredNodeId: null,
  closeNodeIds: [],
};

// ancestorId が targetId の祖先ノードであるかを判定する再帰関数
const isDescendant = (
  structure: Record<NodeDataType["id"], NodeDataType["id"][]>,
  ancestorId: NodeDataType["id"],
  targetId: NodeDataType["id"]
): boolean => {
  const children = structure[ancestorId] || [];
  if (children.includes(targetId)) return true;
  return children.some((childId) => isDescendant(structure, childId, targetId));
};

export const createNodeSlice: StateCreator<NodeStore> = (set) => ({
  ...defaultNodeStore,
  setNodes: (nodeList) => {
    const nodesMap: Record<string, NodeDataType> = nodeList.reduce(
      (acc, nodes) => {
        acc[nodes.id] = nodes;
        return acc;
      },
      {} as Record<string, NodeDataType>
    );
    set({ nodes: nodesMap });
  },
  setStructure: (structure) => set({ structure }),
  moveNode: (activeId, overId) => {
    set((state) => {
      const structure = { ...state.structure };

      if (isDescendant(structure, activeId, overId)) {
        return state;
      }

      const findParentId = (nodeId: NodeDataType["id"]) =>
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
      structure[overParentId] = [
        ...newChildren.slice(0, overIndex),
        activeId,
        ...newChildren.slice(overIndex),
      ];
      return { structure: { ...structure } };
    });
  },
  setNestNode: (parentId, childId) => {
    set((state) => {
      // console.log(`setNestNode: ${parentId}, ${childId}`);
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
      structure[parentId] = [...structure[parentId], childId];
      return { structure };
    });
  },
  addNode: (
    node,
    parentId = PARENT_ID_ROOT,
    order = Number.MAX_SAFE_INTEGER
  ) => {
    set((state) => {
      const newNodes = {
        ...state.nodes,
        [node.id]: node,
      };
      const newStructure = { ...state.structure };
      if (!newStructure[parentId]) {
        newStructure[parentId] = [];
      }
      newStructure[parentId] = [
        ...newStructure[parentId].toSpliced(order, 0, node.id),
      ];
      // console.log("structure: ", newStructure);
      return {
        nodes: newNodes,
        structure: newStructure,
      };
    });
  },
  updateNode: (id, updateFields) => {
    // console.log("updateNode", id, updateFields);
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
      const newStructure = { ...state.structure };

      const delChildrenList: NodeDataType["id"][] = [id];

      // 子ノードも再帰的に検索してリストに加える関数
      const searchDeleteChildren = (id: NodeDataType["id"]) => {
        const children = newStructure[id] || [];
        children.forEach((childId) => {
          delChildrenList.push(childId);
          searchDeleteChildren(childId);
        });
      };
      searchDeleteChildren(id);

      // 構造体から親のノードの参照のみ削除(どこにいるかわからないので全探索)
      Object.keys(newStructure).forEach((parentId) => {
        newStructure[parentId] = newStructure[parentId].filter(
          (childId) => childId !== id
        );
      });
      // 削除対象ノードとその子ノードを構造体から削除
      delChildrenList.forEach((delId) => {
        delete newNodes[delId];
        delete newStructure[delId];
      });

      return { nodes: newNodes, structure: newStructure };
    });
  },

  setEditFieldId: (nodeId) => set({ editFieldId: nodeId }),

  setHoveredNodeId: (nodeId) => set({ hoveredNodeId: nodeId }),

  closeNode: (id) =>
    set((state) => ({ closeNodeIds: [...state.closeNodeIds, id] })),
  openNode: (id) => {
    set((state) => ({
      closeNodeIds: state.closeNodeIds.filter((nodeId) => nodeId !== id),
    }));
  },
});
