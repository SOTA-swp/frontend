const PATH = {
  TOP: "/",
  USER: (userId: string) => `/user/${userId}`,
  SEARCH: "/search",
  PLAN_VIEW: (planId: string) => `/plans/view/${planId}`,
  PLAN_EDIT: (planId: string) => `/plans/edit/${planId}`,
} as const;

export default PATH;
