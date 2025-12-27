import NodeDataType, { NODE_TYPES } from "@/types/node";

export const PARENT_ID_ROOT = "root";

// planIdはpropsで渡す想定 (そもそもいらんのか？)
export const createNode = (
  nodeType: NodeDataType["nodeType"],
  props?: Partial<NodeDataType>
): NodeDataType => {
  const id = window.crypto.randomUUID();

  switch (nodeType) {
    case NODE_TYPES.PROCESS: {
      return {
        id,
        planId: "",
        nodeType: NODE_TYPES.PROCESS,
        name: "新しいプロセス",
        startTime: "09:00",
        endTime: "10:00",
        durationMinutes: 60,
        locationId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...props,
      };
    }
    case NODE_TYPES.LOCATION: {
      return {
        id,
        planId: "",
        nodeType: NODE_TYPES.LOCATION,
        name: "",
        startTime: "09:00",
        endTime: "10:00",
        durationMinutes: 60,
        locationId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...props,
      };
    }
    case NODE_TYPES.MOVE: {
      return {
        id,
        planId: "",
        nodeType: NODE_TYPES.MOVE,
        name: "",
        startTime: "09:00",
        endTime: "10:00",
        durationMinutes: 60,
        locationId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...props,
      };
    }
  }
};
