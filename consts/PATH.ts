const PATH = {
  TOP: "/",
  USER: (userId: string) => `/user/${userId}`,
  SEARCH: "/search",
  PLAN_VIEW: (planId: string) => `/view/${planId}`,
  PLAN_EDIT: (planId: string) => `/edit/${planId}`,
} as const;

export default PATH;
