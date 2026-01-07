// 権限
export const PLAN_ROLE = {
  MEMBER: "MEMBER",
  OWNER: "OWNER",
  VIEWER: "VIEWER",
} as const;

export type PlanRole = typeof PLAN_ROLE[keyof typeof PLAN_ROLE];
