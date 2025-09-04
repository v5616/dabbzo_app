"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseAuthRedirectOptions {
  redirectTo?: string;
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
}

export function useAuthRedirect({
  redirectTo = "/login",
  requireAuth = true,
  redirectIfAuthenticated = false,
}: UseAuthRedirectOptions = {}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      router.push(redirectTo);
    } else if (redirectIfAuthenticated && user) {
      router.push("/");
    }
  }, [user, loading, router, redirectTo, requireAuth, redirectIfAuthenticated]);

  return { user, loading, isAuthenticated: !!user };
}
