import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Use more descriptive log
  console.log("[MIDDLEWARE] Path:", req.nextUrl.pathname, "User:", user);

  const protectedRoutes = ["/history", "/orders", "/profile"];
  if (
    !user &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    console.log("[MIDDLEWARE] Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// Add this config export to optimize middleware execution
export const config = {
  matcher: ["/history", "/orders/:path*", "/profile/:path*"],
};
