export default interface NodeType {
  id: string;
  planId: string;
  nodeType: "process" | "location" | "move";
  name: string;
  displayOrder: number;
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
  nodeType: "process",
  name: `モックノード名前${num}`,
  displayOrder: 0,
  startTime: "09:30",
  endTime: "10:00",
  durationMinutes: 60,
  locationId: `mock-location-id${num}`,
  createdAt: "2025-11-30T12:00:00.000Z",
  updatedAt: "2025-11-30T12:00:00.000Z",
  ...props,
});
