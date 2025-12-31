const PATH = {
  TOP: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER: (userId: string = "me") => `/user/${userId}`,
  SEARCH: "/search",
  PLAN_VIEW: (planId: string) => `/plans/${planId}/view`,
  PLAN_EDIT: (planId: string) => `/plans/${planId}/edit`,
} as const;

export default PATH;
