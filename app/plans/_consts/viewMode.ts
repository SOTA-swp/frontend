export const ViewMode = {
  TIMELINE: "timeline",
  IDEA_SPACE: "idea_space",
} as const;

export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];

export const ViewModeNames: Record<ViewMode, string> = {
  [ViewMode.TIMELINE]: "タイムライン",
  [ViewMode.IDEA_SPACE]: "アイデアスペース",
} as const;
