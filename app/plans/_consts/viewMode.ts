export const VIEW_MODE = {
  TIMELINE: "timeline",
  IDEA_SPACE: "idea_space",
} as const;

export type ViewModeType = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

export const ViewModeNames: Record<ViewModeType, string> = {
  [VIEW_MODE.TIMELINE]: "タイムライン",
  [VIEW_MODE.IDEA_SPACE]: "アイデアスペース",
} as const;
