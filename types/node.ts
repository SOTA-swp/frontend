import z from "zod";

export const NODE_TYPES = {
  PROCESS: "process",
  LOCATION: "location",
  MOVE: "move",
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export const NodeDataSchema = z.object({
  id: z.string(),
  planId: z.string(),
  nodeType: z.enum(NODE_TYPES),
  name: z.string().min(1).max(100),
  startTime: z.iso.datetime(),
  endTime: z.iso.datetime(),
  durationMinutes: z
    .number()
    .int()
    .min(0)
    .max(60 * 24),
  locationId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// TODO: PlanIDはいらん？
export type NodeData = z.infer<typeof NodeDataSchema>;

export const createMockNode = (
  num: number = 0,
  props?: Partial<NodeData>
): NodeData => ({
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
