const PATH = {
  TOP: "/",
  USER: (userId: string) => `/user/${userId}`,
  SEARCH: "/search",
  PLAN_VIEW: (planId: string) => `/plans/${planId}/view`,
  PLAN_EDIT: (planId: string) => `/plans/${planId}/edit`,
} as const;

export default PATH;
