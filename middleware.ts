import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/workspace", "/account", "/settings"];
const locales = ["en", "zh"];

function getProtectedRoute(pathname: string) {
  for (const route of protectedRoutes) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return route;
    }

    for (const locale of locales) {
      const localizedRoute = `/${locale}${route}`;

      if (pathname === localizedRoute || pathname.startsWith(`${localizedRoute}/`)) {
        return route;
      }
    }
  }

  return null;
}

function getLocale(pathname: string) {
  const segment = pathname.split("/")[1];
  return locales.includes(segment) ? segment : "en";
}

export async function middleware(request: NextRequest) {
  const protectedRoute = getProtectedRoute(request.nextUrl.pathname);

  if (!protectedRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  });

  if (token) {
    return NextResponse.next();
  }

  const locale = getLocale(request.nextUrl.pathname);
  const loginUrl = new URL(`/${locale}`, request.url);
  loginUrl.searchParams.set("login", "1");
  loginUrl.searchParams.set(
    "callbackUrl",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workspace/:path*",
    "/account/:path*",
    "/settings/:path*",
    "/:locale/dashboard/:path*",
    "/:locale/workspace/:path*",
    "/:locale/account/:path*",
    "/:locale/settings/:path*"
  ]
};
