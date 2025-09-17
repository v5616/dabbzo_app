export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser should use current path
    return window.location.origin;
  }
  
  // For server-side, use environment variable or fallback to production URL
  return process.env.NEXT_PUBLIC_APP_URL || 'https://dabbzo-app.vercel.app';
};

export const getAuthCallbackUrl = () => {
  return `${getBaseUrl()}/api/auth/callback`;
};

export const getLoginUrl = () => {
  return `${getBaseUrl()}/login`;
};

export const getSignupUrl = () => {
  return `${getBaseUrl()}/signup`;
};
