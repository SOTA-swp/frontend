export const VIEW_MODE = {
  TIMELINE: "timeline",
  IDEA_SPACE: "idea-space",
} as const;

export type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

export const ViewModeNames: Record<ViewMode, string> = {
  [VIEW_MODE.TIMELINE]: "タイムライン",
  [VIEW_MODE.IDEA_SPACE]: "アイデアスペース",
} as const;
