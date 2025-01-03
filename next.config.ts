import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'prod',
  output: 'export',
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;