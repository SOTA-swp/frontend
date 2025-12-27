import NodeDataType from "@/types/node";
import { arrayMove } from "@dnd-kit/sortable";
import { StateCreator } from "zustand";
import { PARENT_ID_ROOT } from "../_util/createNode";
import { PermissionStore } from "./permissionStore";

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
  moveNodeStep: (id: NodeDataType["id"], direction: "up" | "down") => void;
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
  structure: NodeState["structure"],
  ancestorId: NodeDataType["id"],
  targetId: NodeDataType["id"]
): boolean => {
  const children = structure[ancestorId] || [];
  if (children.includes(targetId)) return true;
  return children.some((childId) => isDescendant(structure, childId, targetId));
};

const findParentId = (
  structure: NodeState["structure"],
  nodeId: NodeDataType["id"]
): NodeDataType["id"] | null => {
  for (const parentId in structure) {
    if (structure[parentId].includes(nodeId)) {
      return parentId;
    }
  }
  return null;
};

const isReadOnly = (state: NodeStore & PermissionStore) => state.isReadOnly;

export const createNodeSlice: StateCreator<
  NodeStore & PermissionStore,
  [],
  [],
  NodeStore
> = (set) => ({
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
      if (isReadOnly(state)) return state;
      const structure = { ...state.structure };

      if (isDescendant(structure, activeId, overId)) {
        return state;
      }

      const activeParentId = findParentId(structure, activeId);
      const overParentId = findParentId(structure, overId);

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
  moveNodeStep: (id, direction) => {
    set((state) => {
      if (isReadOnly(state)) return state;
      const structure = { ...state.structure };
      const parentId = findParentId(structure, id);
      if (!parentId) return state;
      const siblings = structure[parentId];
      const index = siblings.indexOf(id);
      if (index === -1) return state;
      const newIndex = direction === "up" ? index - 1 : index + 1;

      // 上限、下限にいる場合、親を超えて移動する
      if (newIndex < 0 || newIndex >= siblings.length) {
        const grandParentId = findParentId(structure, parentId);
        if (!grandParentId) return state;
        const parentSiblings = structure[grandParentId];
        const parentIndex = parentSiblings.indexOf(parentId);
        if (parentIndex === -1) return state;
        structure[parentId] = siblings.filter((sid) => sid !== id);
        // 親の上に移動
        if (newIndex < 0) {
          structure[grandParentId] = [
            ...parentSiblings.slice(0, parentIndex),
            id,
            ...parentSiblings.slice(parentIndex),
          ];
        } else {
          // 親の下に移動
          structure[grandParentId] = [
            ...parentSiblings.slice(0, parentIndex + 1),
            id,
            ...parentSiblings.slice(parentIndex + 1),
          ];
        }
        return { structure: { ...structure } };
      } else {
        // 同じ親内での移動
        structure[parentId] = arrayMove(siblings, index, newIndex);
        return { structure: { ...structure } };
      }
    });
  },
  setNestNode: (parentId, childId) => {
    set((state) => {
      if (isReadOnly(state)) return state;
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
      if (isReadOnly(state)) return state;
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
    set((state) => {
      if (isReadOnly(state)) return state;
      return {
        nodes: {
          ...state.nodes,
          [id]: {
            ...state.nodes[id],
            ...updateFields,
          },
        },
      };
    });
  },
  removeNode: (id) => {
    set((state) => {
      if (isReadOnly(state)) return state;
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
