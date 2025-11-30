export default interface NodeType {
  id: string;
  planId: string;
  parentId: string;
  nodeType: "process" | "location" | "move";
  name: string;
  displayOrder: number;
  timeType: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  locationId: string;
  createdAt: string;
  updatedAt: string;
}

export const createMockNode = (
  num: number = 0,
  props?: Partial<NodeType>
): NodeType => ({
  id: `mock-node-id${num}`,
  planId: `mock-plan-id${num}`,
  parentId: `mock-parent-id${num}`,
  nodeType: "process",
  name: `モックノード名前${num}`,
  displayOrder: 0,
  timeType: "mock-time-type",
  startTime: "2025-11-30T12:00:00.000Z",
  endTime: "2025-11-30T13:00:00.000Z",
  durationMinutes: 60,
  locationId: `mock-location-id${num}`,
  createdAt: "2025-11-30T12:00:00.000Z",
  updatedAt: "2025-11-30T12:00:00.000Z",
  ...props,
});
