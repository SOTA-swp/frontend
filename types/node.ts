export const NODE_TYPES = {
  PROCESS: "process",
  LOCATION: "location",
  MOVE: "move",
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export default interface NodeDataType {
  id: string;
  planId: string;
  nodeType: NodeType;
  name: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  locationId: string;
  createdAt: string;
  updatedAt: string;
}

export const createMockNode = (
  num: number = 0,
  props?: Partial<NodeDataType>
): NodeDataType => ({
  id: `mock-node-id${num}`,
  planId: `mock-plan-id${num}`,
  nodeType: "process",
  name: `モックノード名前${num}`,
  startTime: "09:30",
  endTime: "10:00",
  durationMinutes: 60,
  locationId: `mock-location-id${num}`,
  createdAt: "2025-11-30T12:00:00.000Z",
  updatedAt: "2025-11-30T12:00:00.000Z",
  ...props,
});
