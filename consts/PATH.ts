const PATH = {
  HOME: "/",
  WELCOME: "/welcome",
  SEARCH: "/search",
  VIEW: (planId: string) => `/view/${planId}`,
  EDIT: (planId: string) => `/edit/${planId}`,
} as const;

export default PATH;
