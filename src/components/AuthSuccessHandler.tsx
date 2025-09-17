"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGlobalToast } from "@/providers/ToastProvider";

function AuthSuccessHandlerContent() {
  const searchParams = useSearchParams();
  const { showToast } = useGlobalToast();
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Check for error parameters first (user cancelled or error occurred)
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    // Don't show success toast if there's an error
    if (error || errorDescription) {
      return;
    }

    // Primary signal from callback route (only set on successful auth)
    const signedIn = searchParams.get('signed_in');

    // Legacy fallback (if provider appends tokens in URL)
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    // Only show toast if we have clear success indicators AND no errors
    if ((signedIn === '1' || (accessToken && refreshToken)) && !hasShownToast.current) {
      showToast('Login successful! Welcome back.', 'success');
      hasShownToast.current = true;

      // Clean up URL (remove query params and fragments)
      const url = new URL(window.location.href);
      url.searchParams.delete('signed_in');
      url.searchParams.delete('access_token');
      url.searchParams.delete('refresh_token');
      url.searchParams.delete('expires_in');
      url.searchParams.delete('token_type');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }, [searchParams, showToast]);

  return null; // This component doesn't render anything
}

export default function AuthSuccessHandler() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessHandlerContent />
    </Suspense>
  );
}
