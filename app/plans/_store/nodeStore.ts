import * as Y from "yjs";
import { NodeData } from "@/types/node";
import { StateCreator } from "zustand";
import { PARENT_ID_ROOT } from "../_util/createNode";
import { PermissionStore } from "./permissionStore";
import { YjsStore } from "./yjsStore";
import { PLAN_NODES_KEY, PLAN_STRUCTURE_KEY } from "../_consts/yjsKeys";

export interface NodeState {
  nodes: Record<NodeData["id"], NodeData>;
  structure: Record<NodeData["id"], NodeData["id"][]>;
  editFieldId: string | null;

  // ホバー中のノードID
  hoveredNodeId: string | null;

  // 折りたたまれたノードIDリスト
  closeNodeIds: NodeData["id"][];
}

export interface NodeActions {
  setNodes: (nodeList: NodeData[]) => void;
  setStructure: (structure: Record<NodeData["id"], NodeData["id"][]>) => void;
  moveNode: (activeId: NodeData["id"], overId: NodeData["id"]) => void;
  moveNodeStep: (id: NodeData["id"], direction: "up" | "down") => void;
  addNode: (node: NodeData, parentId?: NodeData["id"], order?: number) => void;
  updateNode: (id: string, updatedFields: Partial<NodeData>) => void;
  removeNode: (id: string) => void;

  // ノードを別のノードの子にする関数
  setNestNode: (parentId: NodeData["id"], childId: NodeData["id"]) => void;

  // ノードの中の編集中要素をセットする関数
  setEditFieldId: (nodeId: string | null) => void;

  // ホバー中のノードIDをセットする関数
  setHoveredNodeId: (nodeId: string | null) => void;

  // 折りたたまれたノードIDを管理する関数
  closeNode: (id: NodeData["id"]) => void;
  openNode: (id: NodeData["id"]) => void;
}

export type NodeStore = NodeState & NodeActions;

export const defaultNodeStore: NodeState = {
  nodes: {},
  structure: {},
  editFieldId: null,
  hoveredNodeId: null,
  closeNodeIds: [],
};

/**
 * Yjs構造から親IDを見つける
 *
 * @param yStructure
 * @param nodeId
 * @returns
 */
const findParentIdInYjs = (
  yStructure: Y.Map<Y.Array<string>>,
  nodeId: string
): string | null => {
  for (const [parentId, children] of yStructure.entries()) {
    let found = false;
    children.forEach((id) => {
      if (id === nodeId) found = true;
    });
    if (found) return parentId;
  }
  return null;
};

/**
 * Y.Array内でのインデックスを見つける
 *
 * @param yArray
 * @param targetId
 * @returns
 */
const findIndexInYArray = (
  yArray: Y.Array<string>,
  targetId: string
): number => {
  let index = 0;
  for (const item of yArray) {
    if (item === targetId) return index;
    index++;
  }
  return -1;
};

/**
 * 依存関係にあるかどうかをYjs構造でチェック
 *
 * @param yStructure
 * @param ancestorId
 * @param targetId
 * @returns
 */
const isDescendantYjs = (
  yStructure: Y.Map<Y.Array<string>>,
  ancestorId: string,
  targetId: string
): boolean => {
  const children = yStructure.get(ancestorId);
  if (!children) return false;

  let found = false;
  children.forEach((childId) => {
    if (childId === targetId) found = true;
  });
  if (found) return true;

  let foundRecursive = false;
  children.forEach((childId) => {
    if (isDescendantYjs(yStructure, childId, targetId)) foundRecursive = true;
  });
  return foundRecursive;
};

export const createNodeSlice: StateCreator<
  NodeStore & PermissionStore & YjsStore,
  [],
  [],
  NodeStore
> = (set, get) => ({
  ...defaultNodeStore,

  setNodes: (nodeList) => {
    const nodesMap: Record<string, NodeData> = nodeList.reduce(
      (acc, nodes) => {
        acc[nodes.id] = nodes;
        return acc;
      },
      {} as Record<string, NodeData>
    );
    set({ nodes: nodesMap });
  },

  setStructure: (structure) => set({ structure }),

  moveNode: (activeId, overId) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      if (isDescendantYjs(yStructure, activeId, overId)) return;

      const activeParentId = findParentIdInYjs(yStructure, activeId);
      const overParentId = findParentIdInYjs(yStructure, overId);

      if (!activeParentId || !overParentId) return;
      if (activeParentId === overId) return;

      const activeParentArray = yStructure.get(activeParentId);
      const overParentArray = yStructure.get(overParentId);

      if (!activeParentArray || !overParentArray) return;

      if (activeParentId === overParentId) {
        const oldIndex = findIndexInYArray(activeParentArray, activeId);
        const newIndex = findIndexInYArray(activeParentArray, overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          activeParentArray.delete(oldIndex, 1);
          activeParentArray.insert(newIndex, [activeId]);
        }
      } else {
        const oldIndex = findIndexInYArray(activeParentArray, activeId);
        if (oldIndex !== -1) {
          activeParentArray.delete(oldIndex, 1);
        }

        const overIndex = findIndexInYArray(overParentArray, overId);
        if (overIndex !== -1) {
          // 前に挿入するか後に挿入するかを決定
          // structure[overParentId] = [...newChildren.slice(0, overIndex), activeId, ...newChildren.slice(overIndex)];
          // これで overIndex に挿入されて、overId が右にずれる。
          overParentArray.insert(overIndex, [activeId]);
        } else {
          // Fallback
          overParentArray.push([activeId]);
        }
      }
    });
  },

  moveNodeStep: (id, direction) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      const parentId = findParentIdInYjs(yStructure, id);
      if (!parentId) return;
      const parentArray = yStructure.get(parentId);
      if (!parentArray) return;

      const index = findIndexInYArray(parentArray, id);
      if (index === -1) return;

      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= parentArray.length) {
        // 先祖ノードに移動
        const grandParentId = findParentIdInYjs(yStructure, parentId);
        if (!grandParentId) return;
        const grandParentArray = yStructure.get(grandParentId);
        if (!grandParentArray) return;

        const parentIndex = findIndexInYArray(grandParentArray, parentId);
        if (parentIndex === -1) return;

        parentArray.delete(index, 1);

        if (newIndex < 0) {
          grandParentArray.insert(parentIndex, [id]);
        } else {
          grandParentArray.insert(parentIndex + 1, [id]);
        }
      } else {
        // 入れ替え
        parentArray.delete(index, 1);
        parentArray.insert(newIndex, [id]);
      }
    });
  },

  setNestNode: (parentId, childId) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      if (parentId === childId) return;
      if (isDescendantYjs(yStructure, childId, parentId)) return;

      const parentArray = yStructure.get(parentId);
      // すでに親子関係がある場合は何もしない
      if (parentArray && findIndexInYArray(parentArray, childId) !== -1) return;

      // 古い親から削除
      const oldParentId = findParentIdInYjs(yStructure, childId);
      if (oldParentId) {
        const oldParentArray = yStructure.get(oldParentId);
        if (oldParentArray) {
          const index = findIndexInYArray(oldParentArray, childId);
          if (index !== -1) oldParentArray.delete(index, 1);
        }
      }

      // 新しい親に追加
      let newParentArray = yStructure.get(parentId);
      if (!newParentArray) {
        newParentArray = new Y.Array();
        yStructure.set(parentId, newParentArray);
      }
      newParentArray.push([childId]);
    });
  },

  addNode: (
    node,
    parentId = PARENT_ID_ROOT,
    order = Number.MAX_SAFE_INTEGER
  ) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      yNodes.set(node.id, node);

      let parentArray = yStructure.get(parentId);
      if (!parentArray) {
        parentArray = new Y.Array();
        yStructure.set(parentId, parentArray);
      }

      const targetIndex = Math.min(Math.max(order, 0), parentArray.length);
      parentArray.insert(targetIndex, [node.id]);
    });
  },

  updateNode: (id, updatedFields) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    ydoc.transact(() => {
      const current = yNodes.get(id);
      if (current) {
        yNodes.set(id, { ...current, ...updatedFields });
      }
    });
  },

  removeNode: (id) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      // 子ノードも含めて削除するためのIDリストを収集
      const toDelete = [id];
      const findChildren = (parentId: string) => {
        const children = yStructure.get(parentId);
        if (children) {
          children.forEach((childId) => {
            toDelete.push(childId);
            findChildren(childId);
          });
        }
      };
      findChildren(id);

      // 構造から削除
      // まずは親ノードから自身を削除
      const parentId = findParentIdInYjs(yStructure, id);
      if (parentId) {
        const parentArray = yStructure.get(parentId);
        if (parentArray) {
          const index = findIndexInYArray(parentArray, id);
          if (index !== -1) {
            parentArray.delete(index, 1);
          }
        }
      }

      // 全ノードとその構造エントリを削除
      toDelete.forEach((delId) => {
        yNodes.delete(delId);
        yStructure.delete(delId);
      });
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
