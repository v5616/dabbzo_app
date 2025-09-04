"use client";

import { useAuth } from "@/providers/AuthProvider";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true 
}: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return fallback || (
      <div className="text-center p-8">
        <p className="text-gray-600 mb-4">Please log in to access this content.</p>
        <a href="/login" className="btn-primary inline-block">
          Login
        </a>
      </div>
    );
  }

  if (!requireAuth && user) {
    return fallback || null;
  }

  return <>{children}</>;
}
