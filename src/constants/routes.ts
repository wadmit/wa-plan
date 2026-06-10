export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ROADMAP: "/roadmap",
  KB: "/kb",
  KB_SITE: (id: string) => `/kb/${id}`,
} as const;