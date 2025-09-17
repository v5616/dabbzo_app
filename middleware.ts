import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  // Only redirect if there's a clear authentication error AND we're on a protected route
  const protectedRoutes = ["/history", "/my-subscriptions", "/profile", "/admin"];
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && (error || !user)) {
    console.log("[MIDDLEWARE] Redirecting unauthenticated user from protected route:", path);

    const redirectUrl = new URL("/login", req.url);
    // Add the original path as a redirect parameter
    redirectUrl.searchParams.set("redirect", path);
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Only clear cookies if there's an explicit auth error (not just missing user)
    if (error) {
      response.cookies.delete("sb-access-token");
      response.cookies.delete("sb-refresh-token");
    }

    return response;
  }

  return res;
}

export const config = {
  matcher: [
    "/history",
    "/orders/:path*",
    "/profile/:path*",
    "/my-subscriptions",
    "/admin/:path*",
  ],
};
