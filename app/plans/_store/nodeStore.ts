import * as Y from "yjs";
import { NodeData, NODE_TYPES } from "@/types/node";
import { StateCreator } from "zustand";
import { PARENT_ID_ROOT, createNode } from "../_util/createNode";
import { PermissionStore } from "./permissionStore";
import { YjsStore } from "./yjsStore";
import {
  PLAN_NODES_KEY,
  PLAN_STRUCTURE_KEY,
  PLAN_LOCATIONS_KEY,
} from "../_consts/yjsKeys";
import { LocationData } from "@/types/location";
import { CalculateRouteResponse } from "@/types/route";
import { PlanInfoStore } from "./planInfoStore";
import { addMinutesToIso } from "@/utils/date";

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
  // 指定した親・順序へノードを移動する（AddNodeBar 用）
  moveNodeTo: (
    parentId: NodeData["id"],
    childId: NodeData["id"],
    order: number
  ) => void;
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

  // 自動計算されたルートを適用する関数
  applyAutoCalculatedRoutes: (calculatedRoutes: CalculateRouteResponse) => void;

  // スケジュール時間を再計算する関数
  recalculateSchedule: () => void;
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
  NodeStore & PermissionStore & YjsStore & PlanInfoStore,
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

  moveNodeTo: (parentId, childId, order) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      if (parentId === childId) return;

      // 古い親から削除
      const oldParentId = findParentIdInYjs(yStructure, childId);
      if (oldParentId) {
        const oldParentArray = yStructure.get(oldParentId);
        if (oldParentArray) {
          const index = findIndexInYArray(oldParentArray, childId);
          if (index !== -1) oldParentArray.delete(index, 1);
        }
      }

      // 新しい親の配列を準備
      let newParentArray = yStructure.get(parentId);
      if (!newParentArray) {
        newParentArray = new Y.Array();
        yStructure.set(parentId, newParentArray);
      }

      // order に挿入（範囲を安全にクランプ）
      const targetIndex = Math.min(Math.max(order, 0), newParentArray.length);
      newParentArray.insert(targetIndex, [childId]);
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

  applyAutoCalculatedRoutes: (calculatedRoutes) => {
    const { ydoc, isReadOnly, planInfo } = get();
    if (!ydoc || isReadOnly) return;

    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);
    const yLocations = ydoc.getMap<LocationData>(PLAN_LOCATIONS_KEY);
    const planId = planInfo.id;

    ydoc.transact(() => {
      // 既存の移動ノードを削除
      const moveNodeIdsToDelete: { id: string; parentId: string }[] = [];
      yNodes.forEach((node) => {
        if (node.nodeType === NODE_TYPES.MOVE) {
          const parentId = findParentIdInYjs(yStructure, node.id);
          if (parentId) {
            moveNodeIdsToDelete.push({ id: node.id, parentId });
          }
        }
      });

      moveNodeIdsToDelete.forEach(({ id, parentId }) => {
        const parentArray = yStructure.get(parentId);
        if (parentArray) {
          const index = findIndexInYArray(parentArray, id);
          if (index !== -1) {
            parentArray.delete(index, 1);
          }
        }
        yNodes.delete(id);
        yStructure.delete(id);
      });

      // 現在のノード構造から、ロケーションノードのフラットなリストと親情報を取得
      const flatLocationNodes: {
        node: NodeData;
        parentId: string;
        order: number;
        location: LocationData;
      }[] = [];

      const traverse = (currentParentId: string, visited: Set<string>) => {
        if (visited.has(currentParentId)) return;
        visited.add(currentParentId);

        const children = yStructure.get(currentParentId)?.toArray() || [];
        children.forEach((nodeId, order) => {
          const node = yNodes.get(nodeId);
          if (!node) return;

          if (node.nodeType === NODE_TYPES.LOCATION) {
            const location = yLocations.get(node.locationId);
            // 座標情報がない(初期状態など)場合も、計算対象にはならないがリストには含めておかないと
            // indexがずれる可能性がある。ただし、APIには有効な座標のみ送っているはずなので、
            // APIのレスポンス(fromIndex)と整合性を取るためには、「APIに送ったリスト」と同じロジックで抽出する必要がある。
            // ここでは「有効な座標を持つロケーション」のみを抽出する。
            if (location && location.lat !== -1 && location.lng !== -1) {
              flatLocationNodes.push({
                node,
                parentId: currentParentId,
                order,
                location,
              });
            }
          } else if (node.nodeType === NODE_TYPES.PROCESS) {
            traverse(nodeId, visited);
          }
        });
      };
      traverse(PARENT_ID_ROOT, new Set());

      // 計算されたルートセグメントに基づいて移動ノードを挿入
      // 逆順に挿入することで、同じ親に複数のMoveを追加する場合のインデックスずれを軽減
      [...calculatedRoutes].reverse().forEach((segment) => {
        // 到着地(toIndex)の情報を取得し、その「直前」に移動ノードを挿入する
        const toLocationNodeInfo = flatLocationNodes[segment.toIndex];

        if (toLocationNodeInfo) {
          const { parentId } = toLocationNodeInfo;

          const durationMinutes = Math.ceil(segment.durationSeconds / 60);
          const newMoveNode = createNode(NODE_TYPES.MOVE, {
            planId,
            durationMinutes,
            // 名前を「〇〇への移動」のようにするとより分かりやすいかも
            name: `${Math.ceil(segment.durationSeconds / 60)}分移動`,
            encodedPolyline: segment.encodedPolyline,
          });
          yNodes.set(newMoveNode.id, newMoveNode);

          let parentArray = yStructure.get(parentId);
          if (!parentArray) {
            parentArray = new Y.Array();
            yStructure.set(parentId, parentArray);
          }

          // 現在のLocationノードのインデックスを再取得して確実にする
          const currentIndex = findIndexInYArray(
            parentArray,
            toLocationNodeInfo.node.id
          );

          if (currentIndex !== -1) {
            // 直前に挿入するので currentIndex の位置に insert
            parentArray.insert(currentIndex, [newMoveNode.id]);
          }
        }
      });
    });
  },

  recalculateSchedule: () => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);

    ydoc.transact(() => {
      // 基準となる開始時刻を取得（ルートの最初の子ノードの開始時刻）
      const rootChildren = yStructure.get(PARENT_ID_ROOT)?.toArray() || [];
      if (rootChildren.length === 0) return;

      const firstNodeId = rootChildren[0];
      const firstNode = yNodes.get(firstNodeId);
      if (!firstNode) return;

      // 全体の開始時刻

      // 基準日として2000-01-01を使用（または既存の値を維持）

      // ここで HH:mm が入っている場合は ISO に変換する必要があるが、

      // 一旦現在時刻をベースにするか、固定日を使う。

      // 既存データ移行のため、HH:mmなら固定日を付与するロジックを入れる。

      let scheduleStartTime =
        firstNode.startTime ||
        new Date("2000-01-01T09:00:00.000Z").toISOString();

      if (scheduleStartTime.match(/^\d{2}:\d{2}$/)) {
        const [h, m] = scheduleStartTime.split(":").map(Number);

        const date = new Date("2000-01-01T00:00:00.000Z");

        date.setHours(h, m, 0, 0);

        scheduleStartTime = date.toISOString();
      }

      // 再帰的に時間を計算して更新する関数
      // 戻り値: この階層の終了時刻
      const updateTimesRecursive = (
        nodeIds: string[],
        startTime: string
      ): string => {
        let currentCursor = startTime;

        nodeIds.forEach((nodeId) => {
          const node = yNodes.get(nodeId);
          if (!node) return;

          const myStartTime = currentCursor;
          let myEndTime = currentCursor;
          let duration = node.durationMinutes;

          if (node.nodeType === NODE_TYPES.PROCESS) {
            const children = yStructure.get(nodeId)?.toArray() || [];

            if (children.length > 0) {
              // 子要素がある場合、子要素の終了時刻が自身の終了時刻になる
              myEndTime = updateTimesRecursive(children, myStartTime);

              // プロセスの durationMinutes も念のため更新しておく（表示用など）
              const start = new Date(myStartTime).getTime();
              const end = new Date(myEndTime).getTime();
              duration = Math.round((end - start) / (1000 * 60));
            } else {
              // 空のプロセス
              myEndTime = addMinutesToIso(myStartTime, duration);
            }
          } else {
            // リーフノード (Location, Move)
            myEndTime = addMinutesToIso(myStartTime, duration);
          }

          yNodes.set(nodeId, {
            ...node,
            startTime: myStartTime,
            endTime: myEndTime,
            durationMinutes: duration,
          });

          // 次のノードの開始時刻を更新
          currentCursor = myEndTime;
        });

        return currentCursor;
      };

      updateTimesRecursive(rootChildren, scheduleStartTime);
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
