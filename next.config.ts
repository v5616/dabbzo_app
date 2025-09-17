import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ Unsplash
      },
      {
        protocol: "https",
        hostname: "wogsvijwtdupbhgltkio.supabase.co", // ✅ Supabase storage
      },
    ],
  },
  reactStrictMode: true,
});

export default nextConfig;
