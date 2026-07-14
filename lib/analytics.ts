export const isAdminAnalyticsPath = (pathname: string) =>
  pathname === "/admin" ||
  pathname.startsWith("/admin/") ||
  pathname === "/api/admin" ||
  pathname.startsWith("/api/admin/") ||
  pathname === "/en/admin" ||
  pathname.startsWith("/en/admin/") ||
  pathname === "/zh/admin" ||
  pathname.startsWith("/zh/admin/");
