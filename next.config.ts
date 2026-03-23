import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Required for the embedded Sanity Studio at /studio
  transpilePackages: ["sanity"],
  // Fix for Turbopack with non-ASCII directory paths
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
