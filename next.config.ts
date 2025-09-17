import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  // Enable static export
  output: 'standalone',
  // Disable server components external packages in favor of transpilePackages
  experimental: {
    serverActions: { 
      bodySizeLimit: '10mb' 
    },
    optimizePackageImports: ['@supabase/supabase-js']
  },
  transpilePackages: ['@supabase/supabase-js'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wogsvijwtdupbhgltkio.supabase.co",
      },
    ],
  },
  reactStrictMode: true,
  // Configure proper module resolution
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
    };
    
    // Add source map support in development
    if (!isServer) {
      config.devtool = 'source-map';
    }
    
    return config;
  },
  // Environment variables that should be available to the client
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});

export default nextConfig;
